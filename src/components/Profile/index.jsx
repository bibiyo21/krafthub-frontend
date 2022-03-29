import React, { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import UsersServiceAPI from "../../api/services/Users/UsersService";
import Wrapper from "./Wrapper";
const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'))

  const { 
    register, 
    handleSubmit, 
  } = useForm();

  const [errors, setErrors] = useState(null);

  const onUpdate = ({ 
    first_name, 
    last_name, 
    email,
    cellphone_number,
    house_info,
    street_name,
    barangay,
    city,
    zipcode
  }) => {
    console.log({ 
      first_name, 
      last_name, 
      cellphone_number,
      house_info,
      street_name,
      barangay,
      city,
      zipcode
    });
    UsersServiceAPI.saveUser({
      id: user.id,
      first_name, 
      last_name, 
      email,
      cellphone_number,
      house_info,
      street_name,
      barangay,
      city,
      zipcode
    }).then((response) => {
      console.log(response)
      let userUpdate = {
        ...user,
        first_name, 
        last_name, 
        cellphone_number,
        house_info,
        street_name,
        barangay,
        city,
        zipcode
      }

      localStorage.setItem('user', JSON.stringify(userUpdate))
    }).catch(({ response }) => {
      if (response?.data?.errors !== undefined) {
        setErrors(response?.data?.errors)
      }
    })
  };

  useEffect(() => {
    console.log({errors})
  }, [errors]);

  return (
    <>
      <Wrapper>
        <Card className="mb-4">
          <Card.Body>
          <Form onSubmit={handleSubmit(onUpdate)}>
            <h3>Update Profile</h3>
            <Form.Group className="mb-3">
              <input type="text" className="form-control" placeholder="Fist Name" {...register("first_name", { required: true })} defaultValue={user.first_name} />
              {errors?.first_name !== undefined && <p className="text-danger">{errors.first_name[0]}</p>}

            </Form.Group>

            <Form.Group className="mb-3">
              <input type="text" className="form-control" placeholder="Last Name" {...register("last_name", { required: true })} defaultValue={user.last_name} />
              {errors?.last_name !== undefined && <p className="text-danger">{errors.last_name[0]}</p>}
            </Form.Group>

            <Form.Group className="mb-3">
              <input type="text" className="form-control" placeholder="Cellphone Number" {...register("cellphone_number", { required: true })} defaultValue={user.cellphone_number} />
              {errors?.cellphone_number !== undefined && <p className="text-danger">{errors.cellphone_number[0]}</p>}
            </Form.Group>

            <Form.Group className="mb-3">
              <input type="text" className="form-control" placeholder="House Info" {...register("house_info", { required: true })} defaultValue={user.house_info} />
              {errors?.house_info !== undefined && <p className="text-danger">{errors.house_info[0]}</p>}
            </Form.Group>

            <Form.Group className="mb-3">
              <input type="text" className="form-control" placeholder="Street Name" {...register("street_name", { required: true })} defaultValue={user.street_name} />
              {errors?.street_name !== undefined && <p className="text-danger">{errors.street_name[0]}</p>}
            </Form.Group>

            <Form.Group className="mb-3">
              <input type="text" className="form-control" placeholder="Barangay" {...register("barangay", { required: true })} defaultValue={user.barangay} />
              {errors?.barangay !== undefined && <p className="text-danger">{errors.barangay[0]}</p>}
            </Form.Group>

            <Form.Group className="mb-3">
              <input type="text" className="form-control" placeholder="City" {...register("city", { required: true })} defaultValue={user.city} />
              {errors?.city !== undefined && <p className="text-danger">{errors.city[0]}</p>}
            </Form.Group>

            <Form.Group className="mb-3">
              <input type="text" className="form-control" placeholder="Zip Code" {...register("zipcode", { required: true })} defaultValue={user.zipcode} />
              {errors?.zipcode !== undefined && <p className="text-danger">{errors.zipcode[0]}</p>}
            </Form.Group>

            <Button size="lg" variant="primary" type="submit" className="mt-3">
              Save
            </Button>
          </Form>
          </Card.Body>
        </Card>
      </Wrapper>
    </>
  );
};

export default Profile;
