import React from "react";
import Signup from "Admin/AddCoach";
import Linking from "Admin/Linking";
import styled from "styled-components";

const AdminWrapper = styled.div`
  .main {
    display: flex;
    justify-content: center;
    align-items: space-between;
  }
`;

const Admin = () => {
  return (
    <AdminWrapper>
      <h1>Admin Page</h1>
      <div className="main">
        <Linking />
        <Signup />
      </div>
    </AdminWrapper>
  );
};

export default Admin;
