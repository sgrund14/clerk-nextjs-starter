import { UserProfile } from "@clerk/nextjs";

export const getServerSideProps = async (context) => {
  console.log("USER PAGE GET SERVER SIDE PROPS RUN");
  return { props: {} };
};

const UserProfilePage = () => <UserProfile path="/user" routing="path" />;

export default UserProfilePage;
