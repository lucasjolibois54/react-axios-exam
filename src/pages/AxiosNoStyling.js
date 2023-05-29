import React, {useState, useEffect} from 'react'
import axios from 'axios'

const baseURL = "https://jsonplaceholder.typicode.com/posts";

function AxiosNoStyling() {
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
    
      const updateItem = async (id, updatedTitle) => {
        try {
          await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            title: updatedTitle,
            body: 'Lorem ipsum dolor sit amet.',
            userId: 1,
          });
          const updatedData = data.map((item) => {
            if (item.id === id) {
              return { ...item, title: updatedTitle };
            }
            return item;
          });
          setData(updatedData);
        } catch (error) {
          console.error('Error updating item:', error);
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
        <div>
          <div>
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Enter a new item"
            />
            <button onClick={addNewItem}>Add Item</button>
          </div>
    
          {loading ? (
            <p>Loading data...</p>
          ) : (
            <ul>
              {data.map((item) => (
                <li key={item.id}>
                  {item.title}
                  {item.body}
                  <button onClick={() => updateItem(item.id, `${item.title} (Updated)`)}>Update</button>
                  <button onClick={() => deleteItem(item.id)}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    };
    
    export default AxiosNoStyling;