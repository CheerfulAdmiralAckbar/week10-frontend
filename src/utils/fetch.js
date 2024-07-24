// export const authCheck = async (jwt) => {
//   try {
//     const response = await fetch('http://localhost:5001/users/verify-token', {
//       method: "GET",
//       mode: "cors",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${jwt}`,
//       },
//     });

//     const data = await response.json();
//     console.log("authCheck: ", data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

const authCheck = async (token) => {
  try {
    const response = await fetch('http://localhost:5001/users/verify-token', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Token verification failed');
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error('Auth check failed:', error);
    return null;
  }
};