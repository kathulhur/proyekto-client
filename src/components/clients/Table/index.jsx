import Forbidden from '../../Forbidden';
import { useQuery } from '@apollo/client';
import query from './query';
import { Button, LinearProgress, Paper, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import Table from '@mui/material/Table'
import { useState } from 'react'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import {default as NextLink} from 'next/link'
const columns = [
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'phone', label: 'Phone', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 }
]

export default function ClientsTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const { loading, error, data } = useQuery(query);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (loading) return <LinearProgress/>;
    if (error) return (
        <>
            { error.graphQLErrors[0]?.extensions.code === "FORBIDDEN" ? 
                <Forbidden/> : // if the error code is forbidden
                <p>Something Went Wrong</p> 
            }
        </>
    )
    
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        {columns.map((column) => (
                        <TableCell
                            key={column.id}
                            style={{ minWidth: column.minWidth }}
                        >
                            {column.label}
                        </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.clients
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((client) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={client.id}>
                                <TableCell>
                                    <NextLink
                                        href={`/clients/${client.id}`}
                                        passHref
                                    >
                                        <Button>
                                            <OpenInNewRoundedIcon/>
                                        </Button>
                                    </NextLink>
                                </TableCell>
                                {columns.map((column) => {
                                    const value = client[column.id];
                                    return (
                                    <TableCell key={column.id}>
                                        {value}
                                    </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.clients.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );

}
