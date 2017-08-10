
import * as assert from 'assert';
import * as should from 'should';

import * as  request from 'supertest';
let done;
import  { SimpleController } from "./server/controllers/simple";
import  { SimpleInjectionController } from "./server/controllers/simpleInjection";
import  { Simple2Controller } from "./server/controllers/simple2";
import  { SimpleService } from "./server/services/simpleService";
import  { SimpleService2 } from "./server/services/simpleService0";

let Request:any = request('http://127.0.0.1:4000');



describe('Verify routing:', function() {
  describe('Injection', function() {
    it('should return injection1', function(done) {
     Request
      .get('/api/injection')
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        assert.equal(res.body.value,'injection1', "wrong inject");
        done();
      });
    });
    it('should return injection2', function(done) {
     Request
      .get('/api/injection/injection2')
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        assert.equal(res.body.value,'injection2', "wrong inject");
        done();
      });
    });
  });
});
