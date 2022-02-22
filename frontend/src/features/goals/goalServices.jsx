import axios from 'axios'

const API_URL = "/api/v1/goals";

const createGoal = async (goal, token) => {
   const config = {
       headers: {
           Authorization: `Bearer ${token}`
       }
   }
   const { data } = await axios.post(API_URL, goal, config)

   return data
}

const getAllGoals = async (token) => {
   const config = {
       headers: {
           Authorization: `Bearer ${token}`
       }
   }
   const { data } = await axios.get(API_URL, config)

   return data
}

const deleteGoal = async (id, token) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.delete(`${API_URL}/${id}`, config)
      return data 
}




const goalServices = { createGoal, getAllGoals, deleteGoal }
export default goalServices;