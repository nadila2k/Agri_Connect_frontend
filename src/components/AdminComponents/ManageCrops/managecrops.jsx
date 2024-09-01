import React, { useState, useEffect } from 'react';
import './Styles_managecrops.css';
import Table from '../Table/table';
import Popup from '../Popup/popup';
import AddCrops from '../Addcrop/addcrop';

const ManageCrops = () => {
    const columns = ['Crop ID', 'Crop Name', 'Change Details'];
    const [crops, setCrops] = useState([]);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [successPopupVisible, setSuccessPopupVisible] = useState(false);
    const [selectedCrop, setSelectedCrop] = useState(null);

    useEffect(() => {
        fetchCrops();
    }, []);

    const fetchCrops = async () => {
        try {
            const response = await fetch('/api/crops'); 
            const data = await response.json();
            setCrops(data);
        } catch (error) {
            console.error('Error fetching crops:', error);
        }
    };

    const handleAddCrop = async (cropName) => {
        try {
            const response = await fetch('/api/crops', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cropName }),
            });

            if (response.ok) {
                fetchCrops();
                setPopupVisible(false);
                setSuccessPopupVisible(true);
            } else {
                console.error('Failed to add crop');
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
