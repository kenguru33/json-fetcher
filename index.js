

/**
 * Fetch json data from an url and filter every json object through a optional plugged in function
 * @param fetch
 * @param filter
 * @constructor
 */
let JsonFetcher = function(fetch, filter) {

    this._filter = filter;
    this._fetch = fetch;
};

/**
 * Fetch json data
 * @param url
 * @returns {Promise.<>}
 */
JsonFetcher.prototype.fetch = function(url) {
    return this._fetch(url)
        .then(res => res.json())
        .then(data => {
            return this.filter(data);
        });
};

/**
 * Filter data
 * @param data
 * @returns {*}
 */

JsonFetcher.prototype.filter = function (data) {
    if(!this._filter) return data;
    return data.map(data=>this._filter(data));
};


module.exports = JsonFetcher;