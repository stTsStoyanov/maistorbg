import { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

function MyProfileCraftmenInformationComponent({ user }) {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div>
      <h1>User Information</h1>
      <Form>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" defaultValue={user.email} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control type={showPassword ? "text" : "password"} placeholder="Password" defaultValue={user.password} />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={toggleShowPassword}>
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>

        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
}

export default MyProfileCraftmenInformationComponent;