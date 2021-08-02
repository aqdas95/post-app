import chai from 'chai'
import chatHttp from 'chai-http'
import 'chai/register-should'
import app from '../index'

chai.use(chatHttp)
const { expect } = chai

describe('Testing the post endpoints:', () => {
  it('It should create a post', (done) => {
    const post = {
      description: 'This is an awesome post'
    }
    chai
      .request(app)
      .post('/api/v1/posts')
      .set('Accept', 'application/json')
      .send(post)
      .end((err, res) => {
        expect(res.status).to.equal(201)
        expect(res.body.data).to.include({
          id: 1,
          description: post.description
        })
        done()
      })
  })

  it('It should not create a post with incomplete parameters', (done) => {
    const post = {}
    chai
      .request(app)
      .post('/api/v1/posts')
      .set('Accept', 'application/json')
      .send(post)
      .end((err, res) => {
        expect(res.status).to.equal(400)
        done()
      })
  })

  it('It should not create a post with invalid parameters', (done) => {
    const post = {
      invalid: 'This is an awesome post'
    }
    chai
      .request(app)
      .post('/api/v1/posts')
      .set('Accept', 'application/json')
      .send(post)
      .end((err, res) => {
        expect(res.status).to.equal(400)
        done()
      })
  })

  it('It should get all posts', (done) => {
    chai
      .request(app)
      .get('/api/v1/posts')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        res.body.data[0].should.have.property('description')
        done()
      })
  })

  it('It should get a particular post', (done) => {
    const postId = 1
    chai
      .request(app)
      .get(`/api/v1/posts/${postId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        res.body.data.should.have.property('description')
        done()
      })
  })

  it('It should not get a particular post with invalid id', (done) => {
    const postId = 8888
    chai
      .request(app)
      .get(`/api/v1/posts/${postId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have
          .property('message')
          .eql(`Cannot find post with the id ${postId}`)
        done()
      })
  })

  it('It should not get a particular post with non-numeric id', (done) => {
    const postId = 'aaa'
    chai
      .request(app)
      .get(`/api/v1/posts/${postId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message').eql('"id" must be a number')
        done()
      })
  })

  it('It should edit a post', (done) => {
    const postId = 1
    const editedPost = {
      description: 'We have edited the post'
    }
    chai
      .request(app)
      .put(`/api/v1/posts/${postId}`)
      .set('Accept', 'application/json')
      .send(editedPost)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.data.id).equal(postId)
        expect(res.body.data.description).equal(editedPost.description)
        done()
      })
  })

  it('It should not edit a post with invalid id', (done) => {
    const postId = '9999'
    const editedPost = {
      description: 'We have edited the post'
    }
    chai
      .request(app)
      .put(`/api/v1/posts/${postId}`)
      .set('Accept', 'application/json')
      .send(editedPost)
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have
          .property('message')
          .eql(`Cannot find post with the id ${postId}`)
        done()
      })
  })

  it('It should not edit a post with non-numeric id', (done) => {
    const postId = 'asd'
    const editedPost = {
      description: 'We have edited the post'
    }
    chai
      .request(app)
      .put(`/api/v1/posts/${postId}`)
      .set('Accept', 'application/json')
      .send(editedPost)
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message').eql(`"\id\" must be a number`)
        done()
      })
  })

  it('It should not edit a post with invalid Parameters', (done) => {
    const postId = 1
    const editedPost = {
      invalid: 'We have edited the post'
    }
    chai
      .request(app)
      .put(`/api/v1/posts/${postId}`)
      .set('Accept', 'application/json')
      .send(editedPost)
      .end((err, res) => {
        expect(res.status).to.equal(400)
        done()
      })
  })

  it('It should rate a post', (done) => {
    const postId = 1
    const rating = {
      rating: '5'
    }
    chai
      .request(app)
      .post(`/api/v1/posts/${postId}/rate`)
      .set('Accept', 'application/json')
      .send(rating)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.data).to.include({
          id: postId,
          average_rating: 5
        })
        done()
      })
  })

  it('It should not rate a post with invalid params', (done) => {
    const postId = 1
    const rating = {
      rating: '10'
    }
    chai
      .request(app)
      .post(`/api/v1/posts/${postId}/rate`)
      .set('Accept', 'application/json')
      .send(rating)
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have
          .property('message')
          .eql(`"rating" must be less than or equal to 5`)
        done()
      })
  })

  it('It should not rate a post with invalid id', (done) => {
    const postId = '799'
    const rating = {
      rating: '3'
    }
    chai
      .request(app)
      .post(`/api/v1/posts/${postId}/rate`)
      .set('Accept', 'application/json')
      .send(rating)
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have
          .property('message')
          .eql(`Cannot find post with the id ${postId}`)
        done()
      })
  })

  it('It should not rate a post with non-numeric id', (done) => {
    const postId = 'asd'
    const rating = {
      rating: '3'
    }
    chai
      .request(app)
      .post(`/api/v1/posts/${postId}/rate`)
      .set('Accept', 'application/json')
      .send(rating)
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message').eql(`"\id\" must be a number`)
        done()
      })
  })

  it('It should get average rating of particular post', (done) => {
    const postId = 1
    chai
      .request(app)
      .get(`/api/v1/posts/${postId}/rate`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        res.body.should.have.property('message').eql('Post rating retrieved')
        done()
      })
  })

  it('It should not get average rating of particular post with invalid id', (done) => {
    const postId = 999
    chai
      .request(app)
      .get(`/api/v1/posts/${postId}/rate`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have
          .property('message')
          .eql(`Cannot find post with the id ${postId}`)
        done()
      })
  })

  it('It should not get average rating of particular post with non-numeric id', (done) => {
    const postId = 'asd'
    chai
      .request(app)
      .get(`/api/v1/posts/${postId}/rate`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message').eql(`"\id\" must be a number`)
        done()
      })
  })

  it('It should not delete a post with invalid id', (done) => {
    const postId = 777
    chai
      .request(app)
      .delete(`/api/v1/posts/${postId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404)
        res.body.should.have
          .property('message')
          .eql(`Cannot find post with the id ${postId}`)
        done()
      })
  })

  it('It should not delete a post with non-numeric id', (done) => {
    const postId = 'asd'
    chai
      .request(app)
      .delete(`/api/v1/posts/${postId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(400)
        res.body.should.have.property('message').eql(`"\id\" must be a number`)
        done()
      })
  })

  it('It should delete a post', (done) => {
    const postId = 1
    chai
      .request(app)
      .delete(`/api/v1/posts/${postId}`)
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.data).to.include({})
        done()
      })
  })
})
