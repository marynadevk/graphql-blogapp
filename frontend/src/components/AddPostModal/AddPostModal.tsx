import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { gql, useMutation } from '@apollo/client';


const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!) {
    postCreate(post: { title: $title, content: $content }) {
      userErrors { message }
      post { title createdAt content user { name } }
    }
  }
`;

export const AddPostModal = () => {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState(null);

  const [addPost, { data }] = useMutation(CREATE_POST);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClick = () => addPost({ variables: { title, content } });

  useEffect(() => {
    if (data) {
      if (data.postCreate.userErrors.length) {
        setError(data.postCreate.userErrors[0].message);
      }
      if (data.postCreate.token) {
        localStorage.setItem('token', data.postCreate.token);
      }
    }
  }, [data]);

  return (
    <>
      <Button variant="primary" onClick={handleShow}> Add Post </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name your post"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="What's on your mind?"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
          <p>{error}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}> Close </Button>
          <Button variant="primary" onClick={handleClick}> Add </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
