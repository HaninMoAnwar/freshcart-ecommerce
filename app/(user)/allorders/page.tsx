'use client'; // Required if you plan to toggle details or navigate interactively

import { getUserOrders } from '@/actions/checkout.action';
import { useEffect, useState } from 'react';
import OrderCard from '@/components/order/OrderCard';
import { OrdersResponse } from '@/types/responses.type';

export default function MyOrdersPage() {
    const [ordersList, setOrdersList] = useState<OrdersResponse | undefined>(undefined)

    useEffect(() => {
        async function getOrders() {
            const data = await getUserOrders();

            setOrdersList(data);
        }
        getOrders();
    }, [])


    return (
        <div className="w-full max-w-350 mx-auto px-4 py-6 overflow-y-auto">

            {/* 🚀 ShadCN Collapsible component wraps the entire card element grid */}
            {ordersList?.map((order) =>
                <OrderCard key={order._id} order={order} />
            )}
        </div>
    );
}

