import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/AdminCustomers.css";

function AdminCustomers() {

    const [customers, setCustomers] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    const [roleFilter, setRoleFilter] = useState("ALL");

    const [showModal, setShowModal] = useState(false);

    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);

    const [viewCustomer, setViewCustomer] = useState(null);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/users"
            );

            setCustomers(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const totalCustomers = customers.length;

    const adminCount = customers.filter(
        user => user.role === "ADMIN"
    ).length;

    const customerCount = customers.filter(
        user => user.role === "CUSTOMER"
    ).length;

    const activeCustomers = customers.filter(
        user => user.isActive
    ).length;
    const filteredCustomers = useMemo(() => {

        return customers.filter(customer => {

            const searchMatch =

                customer.fullName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())

                ||

                customer.email
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

            const roleMatch =

                roleFilter === "ALL"

                ||

                customer.role === roleFilter;

            return searchMatch && roleMatch;

        });

    }, [customers, searchTerm, roleFilter]);
    const deleteCustomer = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this customer?"
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(

                `http://localhost:8080/api/users/${id}`

            );

            alert("Customer deleted.");

            loadCustomers();

        }

        catch (error) {

            console.error(error);

            alert("Unable to delete.");

        }

    };
    const openEditModal = (customer) => {

        setSelectedCustomer(customer);

        setFormData({

            fullName: customer.fullName,

            email: customer.email,

            phone: customer.phone,

            address: customer.address

        });

        setShowModal(true);

    };
    const updateCustomer = async () => {

        try {

            await axios.put(

                `http://localhost:8080/api/users/${selectedCustomer.id}`,

                {

                    ...selectedCustomer,

                    ...formData

                }

            );

            alert("Customer updated.");

            setShowModal(false);

            loadCustomers();

        }

        catch (error) {

            console.error(error);

            alert("Unable to update.");

        }

    };
    const viewCustomerDetails = async (id) => {

        try {

            const response = await axios.get(
                `http://localhost:8080/api/users/${id}`
            );

            setViewCustomer(response.data);

            setShowViewModal(true);

        }

        catch (error) {

            console.error(error);

            alert("Unable to load customer details.");

        }

    };
    return (
        <div className="admin-container">

            <AdminSidebar />

            <div className="customers-content">

                <div className="customers-header">
                    <h1>👥 Customer Management</h1>
                </div>

                {/* Dashboard Cards */}

                <div className="customer-cards">

                    <div className="customer-card">
                        <h3>Total Users</h3>
                        <h2>{totalCustomers}</h2>
                    </div>

                    <div className="customer-card admin-card">
                        <h3>Admins</h3>
                        <h2>{adminCount}</h2>
                    </div>

                    <div className="customer-card customer-role-card">
                        <h3>Customers</h3>
                        <h2>{customerCount}</h2>
                    </div>

                    <div className="customer-card active-card">
                        <h3>Active Users</h3>
                        <h2>{activeCustomers}</h2>
                    </div>

                </div>

                {/* Search + Filter */}

                <div className="customer-toolbar">

                    <input
                        type="text"
                        placeholder="Search by Name or Email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >

                        <option value="ALL">All Roles</option>

                        <option value="ADMIN">Admin</option>

                        <option value="CUSTOMER">Customer</option>

                    </select>

                </div>

                {/* Customer Table */}

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Phone</th>

                            <th>Role</th>

                            <th>Status</th>

                            <th>Created</th>

                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredCustomers.map(customer => (

                                <tr key={customer.id}>

                                    <td>{customer.id}</td>

                                    <td>{customer.fullName}</td>

                                    <td>{customer.email}</td>

                                    <td>{customer.phone}</td>

                                    <td>

                                        <span
                                            className={`role-badge ${customer.role.toLowerCase()}`}
                                        >

                                            {customer.role}

                                        </span>

                                    </td>

                                    <td>

                                        {

                                            customer.isActive ?

                                                <span className="active-status">

                                                    Active

                                                </span>

                                                :

                                                <span className="inactive-status">

                                                    Inactive

                                                </span>

                                        }

                                    </td>

                                    <td>

                                        {

                                            new Date(
                                                customer.createdAt
                                            ).toLocaleDateString()

                                        }

                                    </td>

                                    <td className="customer-actions">

                                        <button
                                            className="customer-view-btn"
                                            onClick={() => viewCustomerDetails(customer.id)}
                                        >
                                            👁 View
                                        </button>

                                        <button
                                            className="customer-edit-btn"
                                            onClick={() => openEditModal(customer)}
                                        >
                                            ✏ Edit
                                        </button>

                                        <button
                                            className="customer-delete-btn"
                                            onClick={() => deleteCustomer(customer.id)}
                                        >
                                           🗑 Delete
                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

                {/* Edit Modal */}

                {

                    showModal && (

                        <div
                            className="food-modal-overlay"
                            onClick={() => setShowModal(false)}
                        >

                            <div
                                className="food-modal"
                                onClick={(e) => e.stopPropagation()}
                            >

                                <div className="food-modal-header">

                                    <h2>Edit Customer</h2>

                                    <button
                                        className="close-modal-btn"
                                        onClick={() => setShowModal(false)}
                                    >

                                        ×

                                    </button>

                                </div>

                                <div className="food-form">

                                    <label>

                                        Full Name

                                        <input
                                            type="text"
                                            value={formData.fullName}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    fullName: e.target.value
                                                })
                                            }
                                        />

                                    </label>

                                    <label>

                                        Email

                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    email: e.target.value
                                                })
                                            }
                                        />

                                    </label>

                                    <label>

                                        Phone

                                        <input
                                            type="text"
                                            value={formData.phone}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    phone: e.target.value
                                                })
                                            }
                                        />

                                    </label>

                                    <label>

                                        Address

                                        <textarea
                                            rows="3"
                                            value={formData.address}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    address: e.target.value
                                                })
                                            }
                                        />

                                    </label>

                                    <div className="form-actions">

                                        <button
                                            className="cancel-btn"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            className="save-btn"
                                            onClick={updateCustomer}
                                        >
                                            Update Customer
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    )

                }
                {
                    showViewModal && viewCustomer && (

                        <div
                            className="food-modal-overlay"
                            onClick={() => setShowViewModal(false)}
                        >

                            <div
                                className="food-modal"
                                onClick={(e) => e.stopPropagation()}
                            >

                                <div className="food-modal-header">

                                    <h2>

                                        Customer Details

                                    </h2>

                                    <button
                                        className="close-modal-btn"
                                        onClick={() => setShowViewModal(false)}
                                    >

                                        ×

                                    </button>

                                </div>

                                <div className="food-form">

                                    <p><strong>ID:</strong> {viewCustomer.id}</p>

                                    <p><strong>Name:</strong> {viewCustomer.fullName}</p>

                                    <p><strong>Email:</strong> {viewCustomer.email}</p>

                                    <p><strong>Phone:</strong> {viewCustomer.phone}</p>

                                    <p><strong>Role:</strong> {viewCustomer.role}</p>

                                    <p><strong>Status:</strong> {viewCustomer.isActive ? "Active" : "Inactive"}</p>

                                    <p><strong>Date of Birth:</strong> {viewCustomer.dateOfBirth || "N/A"}</p>

                                    <p><strong>Address:</strong> {viewCustomer.address || "N/A"}</p>

                                    <p>
                                        <strong>Created:</strong>{" "}
                                        {new Date(viewCustomer.createdAt).toLocaleString()}
                                    </p>

                                    <p>
                                        <strong>Updated:</strong>{" "}
                                        {new Date(viewCustomer.updatedAt).toLocaleString()}
                                    </p>

                                    <div className="form-actions">

                                        <button
                                            className="cancel-btn"
                                            onClick={() => setShowViewModal(false)}
                                        >

                                            Close

                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    )
                }

            </div>

        </div>

    );
}
export default AdminCustomers;