import Spinner from '../../Spinner';
import Forbidden from '../../Forbidden';
import { FaExternalLinkSquareAlt } from 'react-icons/fa';
import { useQuery } from '@apollo/client';
import query from './query';
import { Button, LinearProgress, Paper, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import Table from '@mui/material/Table'
import { useState } from 'react'
import OpenInNewRounded from '@mui/icons-material/OpenInNewRounded';
import { default as NextLink} from 'next/link'

const columns = [
    { id: 'username', label: 'Username', minWidth: 100 },
    { id: 'role', label: 'Role', minWidth: 100 },
    { id: 'twoFactorAuthEnabled', label: 'Two Factor Auth Enabled', minWidth: 100 },
    { id: 'twoFactorAuthQrLink', label: 'Two Factor Auth Qr Link', minWidth: 100 }
]

export default function UsersTable() {
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
                    {data.users
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((user) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                                <TableCell>
                                    <NextLink
                                        href={`users/${user.id}`}
                                        passHref
                                    >
                                        <Button>
                                            <OpenInNewRounded/>
                                        </Button>
                                    </NextLink>
                                </TableCell>
                                {columns.map((column) => {
                                    const value = user[column.id];
                                    
                                    return (
                                    <TableCell key={column.id}>
                                        {String(value)}
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
                count={data.users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );

}
