import { useEffect, useState } from "react";
import axios from "axios";
import {
    Card,
    CardContent,
    Typography,
    Avatar,
    CircularProgress,
    Pagination,
} from "@mui/material";
import { motion } from "framer-motion";

export default function AllUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const usersPerPage = 10;

    async function fetchUsers() {
        try {
            setLoading(true);
            let { data } = await axios.get("https://basmah-lyn.runasp.net/api/Users");
            setUsers(data.data);
            setLoading(false);
            console.log(data);

        } catch (err) {
            console.error("Error fetching users:", err);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    // حساب عدد الصفحات
    const pageCount = Math.ceil(users.length / usersPerPage);

    // فلترة اليوزرز للصفحة الحالية
    const displayedUsers = users.slice(
        (page - 1) * usersPerPage,
        page * usersPerPage
    );

    return (
        <div className="min-h-screen p-6 max-w-6xl mx-auto">
            <Typography variant="h4"
                className="font-bold text-center text-white mb-20 pt-10"
            >
                All Users
            </Typography>

            {loading ? (
                <div className="flex justify-center items-center h-64 mt-20">
                    <CircularProgress />
                </div>
            ) : (
                <>
                    <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-20">
                        {displayedUsers.map((user, index) => (
                            <motion.div
                                key={user.userId}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="transition-transform duration-500"
                            >
                                <Card className="rounded-2xl shadow-lg bg-gradient-to-br from-blue-50 to-indigo-100 hover:shadow-2xl">
                                    <CardContent className="flex items-center gap-4 p-6">
                                        {/* Avatar */}
                                        <Avatar className="bg-gradient-to-r from-indigo-500 to-blue-500 shadow-md w-14 h-14 text-lg font-bold">
                                            {user.fullName?.charAt(0) || "U"}
                                        </Avatar>

                                        {/* User Info */}
                                        <div className="flex flex-col">
                                            <Typography variant="h6" className="font-semibold text-gray-800">
                                                {user.fullName}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                className="text-gray-600 truncate max-w-[220px]"
                                            >
                                                {user.email}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                className="text-indigo-600 font-medium mt-1"
                                            >
                                                {user.role}
                                            </Typography>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-8">
                        <Pagination
                            count={pageCount}
                            page={page}
                            onChange={(e, value) => setPage(value)}
                            color="primary"
                        />
                    </div>
                </>
            )}
        </div>
    );
}
