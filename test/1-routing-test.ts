
import * as assert from 'assert';
import * as should from 'should';

import * as  request from 'supertest';
let done;
import { Squirtle, Route,HttpGet, HttpPost, Injectable } from "./../index";
import  { SimpleController } from "./server/controllers/simple";
import  { SimpleInjectionController } from "./server/controllers/simpleInjection";
import  { Simple2Controller } from "./server/controllers/simple2";
import  { SimpleService } from "./server/services/simpleService";
import  { SimpleService2 } from "./server/services/simpleService0";

let Request:any = request('http://127.0.0.1:4000');



describe('Verify routing:', function() {
  before(function(done){
    let server = new Squirtle();
    server.init({
      controllers:[SimpleController,Simple2Controller, SimpleInjectionController],
      services:[SimpleService2,SimpleService]
    });
    setTimeout(done,1000)
  }),
  describe('In controller routing', function() {
    it('should return get', function(done) {
      Request
      .get('/api/simple')
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        assert.equal(res.body.value,'get', "wrong route");
        done();
      });
    });
    it('should return get from simple2', function(done) {
    Request
      .get('/api/foo')
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        assert.equal(res.body.value,'get-simple2', "wrong controller");
        done();
      });
    });
    it('should return 404 for controller bar', function(done) {
    Request
      .get('/api/bar')
      .expect(404)
      .end(function(err, res) {
        if (err) throw err;
        done();
      });
    });
    it('should return 404 for router', function(done) {
    Request
      .post('/api/foo')
      .expect(404)
      .end(function(err, res) {
       if (err) throw err;
        done();
      });
    });
    it('should return post', function(done) {
    Request
      .post('/api/simple')
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        assert.equal(res.body.value,'post', "wrong route");
        done();
      });
    });
    it('should return get', function(done) {
    Request
      .delete('/api/simple')
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        assert.equal(res.body.value,'delete', "wrong route");
        done();
      });
    });
    it('should return foo', function(done) {
    Request
      .get('/api/simple/foo')
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        assert.equal(res.body.value,'foo', "wrong route");
        done();
      });
    });
    it('should return bar', function(done) {
    Request
      .get('/api/simple/bar')
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        assert.equal(res.body.value,'bar', "wrong route");
        done();
      });
    });
    it('should return good parameters in body', function(done) {
    Request
      .delete('/api/simple')
      .expect(200)
      .send({param1:"param1",param2:"param2",param3:"param3"})
      .end(function(err, res) {
        if (err) throw err;
        assert.equal(res.body.param1,'param1', "wrong param1");
        assert.equal(res.body.param2,'param2', "wrong param2");
        assert.equal(res.body.param3,undefined, "wrong param3");
        done();
      });
    });
    it('should return good parameters in query', function(done) {
    Request
      .get('/api/foo?params1=params1&params2=params2&params3=params3')
      .expect(200)
      .end(function(err, res) {
        if (err) throw err;
        assert.equal(res.body.params1,'params1', "wrong param1");
        assert.equal(res.body.params2,'params2', "wrong param2");
        assert.equal(res.body.params3,undefined, "wrong param3");
        done();
      });
    });

  });
});
