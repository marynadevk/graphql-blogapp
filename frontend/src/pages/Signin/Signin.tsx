import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from '@restart/ui/Button';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const SIGNIN = gql`
  mutation Signup($email: String!, $password: String!) {
    signIn(credentials: { email: $email, password: $password }) {
      userErrors { message }, token, userId
    }
  }
`;

export const Signin = () => {
  const navigate = useNavigate();
  const [signin, { data }] = useMutation(SIGNIN);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data) {
      if (data.signIn.userErrors.length) {
        setError(data.signIn.userErrors[0].message);
      }
      if (data.signIn.token) {
        localStorage.setItem('token', data.signIn.token);
      }
      if (data.signIn.userId) {
        setUserId(data.signIn.userId);
      }
    }
  }, [data]);


  const handleClick = () => {
    signin({ variables: { email, password } });
    if (userId) {
      navigate(`/profile/${userId}`);
    }
  };

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {error && <p>{error}</p>}
        <Button onClick={handleClick}>Sign in</Button>
      </Form>
    </div>
  );
}
