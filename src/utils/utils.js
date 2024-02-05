import axios from "axios";

// use something like this to call fetchDataFromAPI:
// const [goalQuery, setGoalQuery] = useState({
//     category: 'home',
//     sort: 'priority',
//     complete: false
// });
export const fetchDataFromAPI = async (query) => {
  let endPoint = query.category === "home" ? "/api/goals" : "/api/goalSelect";
  console.log("Endpoint is: " + endPoint);
  try {
    const response = await axios.get(endPoint, { params: query });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// add date functions
