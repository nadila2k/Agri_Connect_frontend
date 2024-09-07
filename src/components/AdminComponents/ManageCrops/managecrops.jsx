import React, { useState, useEffect } from 'react';
import './Styles_managecrops.css';
import Table from '../Table/table';
import Popup from '../Popup/popup';
import AddCrops from '../Addcrop/addcrop';
import apiHelper from '../../../features/apiHelper.js'

const ManageCrops = () => {
    const columns = ['Crop ID', 'Crop Name', 'Change Details'];
    const [crops, setCrops] = useState([]);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [successPopupVisible, setSuccessPopupVisible] = useState(false);
    const [selectedCrop, setSelectedCrop] = useState(null);

    const fetchCrops = async () => {
        try {
            const response = await apiHelper('get', {
                url: '/crops',
            });
            setCrops(response); 
        } catch (error) {
            console.error('Error fetching crops:', error);
        }
    };

   
    useEffect(() => {
        fetchCrops();
    }, []);

    const handleAddCrop = async (cropName) => {
        let name = cropName;
        try {
            const response = await apiHelper('post', {
                url: '/crops',
                data: { name },
            });

            if (response && !response.error) {
                setPopupVisible(false);
                setSuccessPopupVisible(true);
                
                fetchCrops();
            } else {
                console.error('Failed to add crop:', response.error || 'Unknown error');
            }
        } catch (error) {
            console.error('Error adding crop:', error);
        }
    };
    

    const closeSuccessPopup = () => setSuccessPopupVisible(false);

    return (
        <div className="manage-crops-container">
            <h1>Manage Crops</h1>
            <p>Here you can manage your crops.</p>

            <div className="add-crop-container">
                <AddCrops onAdd={handleAddCrop} />
            </div>

            <div className="table-container">
                <Table columns={columns} data={crops} />
            </div>

            {successPopupVisible && (
                <Popup onClose={closeSuccessPopup} message="Crop added successfully!" />
            )}
        </div>
    );
};

export default ManageCrops;
