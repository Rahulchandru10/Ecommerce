const express = require('express');
const db = require('../../config/db');
const { Client } = require('@elastic/elasticsearch');

const router = express.Router();
const esClient = new Client({
  node: 'http://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'I2JlkRf89-Wz5=uz0QI7'
  }
});

router.post('/index', async (req, res) => {
  db.query('SELECT * FROM allproducts', async (error, results) => {
    if (error) {
      console.error('Error fetching data:', error);
      return res.status(500).json({ error: 'Database query failed' });
    }

    body = results.flatMap(doc => [
      { update: { _index: 'my_index', _id: doc.id } },
      { 
        doc: { 
          id: doc.id,
          name: doc.name, 
          category: doc.category,
          price: doc.price,
          discount: doc.discount,
          description: doc.description,
          stock: doc.stock,
          image: doc.image
        },
        upsert: { 
          id: doc.id,
          name: doc.name, 
          category: doc.category,
          price: doc.price,
          discount: doc.discount,
          description: doc.description,
          stock: doc.stock,
          image: doc.image
        }
      }
    ]);    

    try {
      const { body: bulkResponse } = await esClient.bulk({ refresh: true, body });
      console.log('Bulk Response:', bulkResponse);
      
      if (bulkResponse.errors) {
        console.error('Errors occurred during indexing:', bulkResponse.errors);
        return res.status(500).json({ error: 'Errors occurred during indexing' });
      }
      console.log('Data indexed successfully:', bulkResponse);
    } catch (err) {
      console.error('Error indexing data:', err.message); 
      return res.status(500).json({ error: 'Elasticsearch indexing failed' });
    }    

  });
});

router.get('/', async (req, res) => {
  let searchQuery = req.query.name;
  console.log(searchQuery);

  if (!searchQuery) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  const regex = /(?:below|under|above|over)\s+(\d+)/i;
  let amount;
  let priceCondition;

  if (regex.test(searchQuery)) {
    const match = searchQuery.match(regex);
    amount = parseInt(match[1], 10);
    
    // Determine the price condition based on the keyword matched
    if (match[0].toLowerCase().startsWith('below') || match[0].toLowerCase().startsWith('under')) {
      priceCondition = { lte: amount }; 
    } else if (match[0].toLowerCase().startsWith('above') || match[0].toLowerCase().startsWith('over')) {
      priceCondition = { gte: amount };
    }

    searchQuery = searchQuery.replace(regex, '').trim();
  }

  try {
    const searchBody = await esClient.search({
      index: 'my_index',
      body: {
        query: {
          bool: {
            must: [
              {
                bool: {
                  should: [
                    {
                      match: {
                        name: {
                          query: searchQuery,
                        },
                      },
                    },
                    {
                      match_phrase_prefix: {
                        name: searchQuery, 
                      },
                    },
                    {
                      match: {
                        description: {
                          query: searchQuery,
                        },
                      },
                    },
                  ],
                },
              },
              ...(priceCondition ? [{
                range: {
                  price: priceCondition,
                },
              }] : []),
            ],
          },
        },
      },
    });

    const searchResults = searchBody.hits.hits.map(hit => hit._source);
    return res.status(200).json({ results: searchResults, message: "Products fetched" });
  } catch (error) {
    console.error('Error during Elasticsearch search:', error);
    return res.status(500).json({ error: 'Search operation failed' });
  }
});

module.exports = router;

