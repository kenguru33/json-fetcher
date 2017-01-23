const JsonFetcher = require('../index');
const sinon = require('sinon');
const assert = require("assert");

let jsonResponse = [
    {
        "MMSI": "257959900",
        "Ship_name": "130 UTVAER",
        "Destination": "0",
        "Latitude": "60° 48.4835'",
        "Longitude": "004° 58.5717'",
        "Decimal_Latitude": "60.808058333333335",
        "Decimal_Longitude": "4.976195",
        "Time_stamp": "2017-01-22T22:02:02.000Z",
        "SOG": ".0",
        "COG": "327"
    },
    {
        "MMSI": "259193000",
        "Ship_name": "DET NORSKE VERITAS",
        "Destination": "+47 91679625",
        "Latitude": "68° 04.2575'",
        "Longitude": "013° 32.3050'",
        "Decimal_Latitude": "68.07095833333334",
        "Decimal_Longitude": "13.538416666666667",
        "Time_stamp": "2017-01-22T22:02:04.000Z",
        "SOG": ".0",
        "COG": "340"
    },
    {
        "MMSI": "259460000",
        "Ship_name": "ERIK BYE",
        "Destination": "0",
        "Latitude": "63° 07.0604'",
        "Longitude": "007° 44.2467'",
        "Decimal_Latitude": "63.117673333333336",
        "Decimal_Longitude": "7.737445",
        "Time_stamp": "2017-01-22T22:00:52.000Z",
        "SOG": ".0",
        "COG": "188"
    }
];

let fetchMock = function (url) {
    return Promise.resolve({
        json: function() {
            return Promise.resolve(jsonResponse);
        }
    });
};



describe('JsonFetcher', ()=> {

    let jsonFetcher;

    describe('jsonFetcher.fetch', () => {

        let jsonFetcher;

        before(()=>{
            jsonFetcher = new JsonFetcher(fetchMock);
        });

        let filter;

        beforeEach(()=>{
            filter = sinon.spy(jsonFetcher,'filter');
        });

        afterEach(()=>{
            filter.restore();
        });

        it('should call filter once', sinon.test(()=>{
            return jsonFetcher.fetch('http://dummy')
                .then(data=>{
                    sinon.assert.calledOnce(filter);
                });
        }));

        it('should call filter with response data', sinon.test(()=>{
            return jsonFetcher.fetch('http://dummy')
                .then(data=>{
                    sinon.assert.calledWith(filter,jsonResponse);
                });
        }));

    });

    describe('jsonfetcher.filter', ()=>{

        let filter = function (data) {
            data.MMSI = '0';
            return data;
        };

        let jsonFetcher = new JsonFetcher(fetchMock, filter);

        it('should run filter on every json object',()=>{
            let filteredObjects = jsonFetcher.filter(jsonResponse);
            assert.equal(filteredObjects[0].MMSI,0);
            assert.equal(filteredObjects[1].MMSI,0);
            assert.equal(filteredObjects[2].MMSI,0);
        });
    });


});