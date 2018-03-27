const assert = require('assert');
const axios = require('axios');

describe('Sonar', function() {
  it('check Sonar Report', function() {
    axios.get('https://sonarcloud.io/api/badges/gate?key=spoiled-tomatillos')
      .then((res) => {
        let containsFailing = res.data.includes('failing');
        assert.equal(containsFailing, false);
      })
  });
});