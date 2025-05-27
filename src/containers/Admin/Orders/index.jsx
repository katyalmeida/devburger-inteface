import React, { useEffect, useState } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Row } from './row';
import api from '../../../services/api';
import { orderStatusOptions } from './orderStatus';
import { FilterOption, Filter } from './styles';

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [rows, setRows] = useState([]);
  const [activeStatus, setActiveStatus] = useState(0);

  // Função para carregar os pedidos da API
  useEffect(() => {
    async function loadOrders() {
      try {
        const { data } = await api.get('orders');
        setOrders(data);
        setFilteredOrders(data);
      } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
      }
    }
    loadOrders();
  }, []);

  // Função para criar a estrutura de dados da tabela
  function createData(order) {
    return {
      name: order.user.name,
      orderId: order._id,
      date: order.createdAt,
      status: order.status,
      products: order.products,
    };
  }

  // Atualiza as linhas da tabela com base nos pedidos filtrados
  useEffect(() => {
    const newRows = filteredOrders.map((order) => createData(order));
    setRows(newRows);
  }, [filteredOrders]);

  // Função para manipular o filtro de status
  function handleStatus(status) {
    if (status.id === 0) {
      setFilteredOrders(orders);
    } else {
      const newOrders = orders.filter((order) => order.status === status.value);
      setFilteredOrders(newOrders);
    }
    setActiveStatus(status.id);
  }

  // Atualiza os pedidos filtrados quando a lista de pedidos muda
  useEffect(() => {
    if (activeStatus === 0) {
      setFilteredOrders(orders);
    } else {
      const statusOption = orderStatusOptions.find(
        (item) => item.id === activeStatus,
      );
      if (statusOption) {
        const newFilteredOrders = orders.filter(
          (order) => order.status === statusOption.value,
        );
        setFilteredOrders(newFilteredOrders);
      }
    }
  }, [orders, activeStatus]);

  return (
    <>
      {/* Filtro de status */}
      <Filter>
        {orderStatusOptions.map((status) => (
          <FilterOption
            key={status.id}
            onClick={() => handleStatus(status)}
            $isActiveStatus={activeStatus === status.id}
          >
            {status.label}
          </FilterOption>
        ))}
      </Filter>

      {/* Tabela de pedidos */}
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Pedido</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Data do Pedido</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row
                key={row.orderId}
                row={row}
                setOrders={setOrders}
                orders={orders}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
