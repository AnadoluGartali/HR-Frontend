import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ArchivePage.css';
import axiosInstance from "../../api";

const AssignmentArchivePage = () => {
    const [archiveData, setArchiveData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('http://localhost:8080/api/archive/assignment');
                setArchiveData(response.data);
            } catch (error) {
                console.error('Error fetching assignment archive data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="archive-page">
            <div className="archive-container">
                <button className="back-button" onClick={() => navigate('/adminpage')}>
                    <ArrowLeft size={20} />
                    <span>Back to Admin</span>
                </button>
                <h1 className="archive-title">Assignment Archive</h1>
                <div className="archive-table-container">
                    <table className="archive-table">
                        <thead>
                        <tr>
                            {archiveData.length > 0 && Object.keys(archiveData[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {archiveData.map((item, index) => (
                            <tr key={index}>
                                {Object.values(item).map((value, i) => (
                                    <td key={i}>{value}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AssignmentArchivePage;