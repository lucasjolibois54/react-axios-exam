import React from 'react'
import axios from 'axios'
import {useState, useEffect} from 'react'

const baseURL = "https://jsonplaceholder.typicode.com/posts";

function Home() {
      const [data, setData] = useState([]);
      const [newItem, setNewItem] = useState('');
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
          setData(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };
    
      const addNewItem = async () => {
        try {
          const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
            title: newItem,
            body: 'Lorem ipsum dolor sit amet.',
            userId: 1,
          });
          setData([...data, response.data]);
          setNewItem('');
        } catch (error) {
          console.error('Error adding new item:', error);
        }
      };
    
      const deleteItem = async (id) => {
        try {
          await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
          const filteredData = data.filter((item) => item.id !== id);
          setData(filteredData);
        } catch (error) {
          console.error('Error deleting item:', error);
        }
      };
    
      return (
<div className="max-w-6xl mx-auto px-5">
  <div className="space-y-4">
  <h1 className="text-3xl lg:text-5xl text-center font-bold mt-16 mb-16">React Axios</h1>
    <div className="flex mb-10">
      <input
        className="border rounded-l py-2 px-4 w-full"
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Enter a new item"
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
        onClick={addNewItem}
      >
        Add Item
      </button>
    </div>

    {loading ? (
      <p>Loading data...</p>
    ) : (
      <ul>
        {data.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between py-2 border-b"
          >
        <div className='flex flex-col'>
        <p className="font-bold">{item.title}</p>
        <p className='w-5/6'>{item.body}</p>
        </div>
            <div className="">
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => deleteItem(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
</div>

      );
    };
    
    export default Home;
    