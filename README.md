# json-fetcher

fetch json data from a given url and run through a filter.

## Example:
```javascript
const JsonFetcher = require('jsonFetcher');
const Validator = require('is-my-json-valid');

// filter away additionally properties
const filter = validator.filter({
  required: true,
  type: 'object',
  properties: {
    hello: {type: 'string', required: true}
  },
  additionalProperties: false
})

const jsonFetcher = new JsonFetcher(fetch, filter);
const jsonFetcher.fetch(http://mydata.no/data.json)
  .then(data=>console.log(data);
```
