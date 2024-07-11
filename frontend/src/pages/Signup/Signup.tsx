import { ChangeEvent, useEffect, useState } from 'react';
import Button from '@restart/ui/Button';
import { Form } from 'react-bootstrap';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const SIGNUP = gql`
  mutation Signup(
    $email: String!
    $password: String!
    $name: String!
    $bio: String!
  ) {
      signUp(
        credentials: { email: $email, password: $password }
        name: $name
        bio: $bio
      ) { 
          userErrors { message }, token, userId
        }
    }
`;

export const Signup = () => {
  const navigate = useNavigate();
  const [signup, { data }] = useMutation(SIGNUP);
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    bio: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClick = () => {
    const { email, password, name, bio } = formData;
    signup({ variables: { email, password, name, bio } });
    if (userId) {
      navigate(`/profile/${userId}`);
    }
  };

  const [error, setError] = useState(null);

  useEffect(() => {
    if (data) {
      if (data.signUp.userErrors.length) {
        setError(data.signUp.userErrors[0].message);
      }
      if (data.signUp.token) {
        localStorage.setItem('token', data.signUp.token);
      }
      if (data.signIn.userId) {
        setUserId(data.signIn.userId);
      }
    }
  }, [data]);

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder=""
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            placeholder=""
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder=""
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </Form.Group>
        {error && <p>{error}</p>}
        <Button onClick={handleClick}>Sign up</Button>
      </Form>
    </div>
  );
}
