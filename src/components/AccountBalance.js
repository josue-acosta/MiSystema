import React, { Component } from 'react';


// Components
import AccountBalanceItem from './AccountBalanceItem'


// Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


class AccountBalance extends Component {
    state = {
        transactions: [
            {
                "id": "a5833766-4f56-43d9-8fe8-2167ae643320",
                "date": "2018-09-21",
                "amount": -14800,
                "memo": "",
                "cleared": "cleared",
                "approved": true,
                "flag_color": null,
                "account_id": "576c9b91-5c4b-4152-9245-a3eba1276a65",
                "account_name": "checkings",
                "payee_id": "d6c4856b-4d9e-4471-af1f-fa61f1000269",
                "payee_name": "054774 WM SUPERCENTER # DES MOINES IA ##3806",
                "category_id": "59dc9ea9-60a4-4e7a-85d8-50f1c1f6cd92",
                "category_name": "Misc.",
                "transfer_account_id": null,
                "transfer_transaction_id": null,
                "matched_transaction_id": null,
                "import_id": "YNAB:-14800:2018-09-21:1",
                "deleted": false,
                "subtransactions": []
            },
            {
                "id": "d91c8763-bf99-47cf-8064-c60f50099efe",
                "date": "2018-09-21",
                "amount": -2320,
                "memo": "",
                "cleared": "cleared",
                "approved": true,
                "flag_color": null,
                "account_id": "576c9b91-5c4b-4152-9245-a3eba1276a65",
                "account_name": "checkings",
                "payee_id": "b292c8bb-57db-440b-a1e0-d8798653fdb4",
                "payee_name": "948300 ALDI 72029 DES MOINES IA ##3806",
                "category_id": "89b29c62-d17b-4a40-aec4-33b92048ec05",
                "category_name": "Groceries",
                "transfer_account_id": null,
                "transfer_transaction_id": null,
                "matched_transaction_id": null,
                "import_id": "YNAB:-2320:2018-09-21:1",
                "deleted": false,
                "subtransactions": []
            },
            {
                "id": "b3831070-4b6f-440b-b25b-d31ade3057fc",
                "date": "2018-09-24",
                "amount": -31690,
                "memo": "",
                "cleared": "cleared",
                "approved": true,
                "flag_color": null,
                "account_id": "576c9b91-5c4b-4152-9245-a3eba1276a65",
                "account_name": "checkings",
                "payee_id": "320afae4-dfa4-4d99-a3ac-322e3543651e",
                "payee_name": "030978 CASEYS DES MOINES IA ##3806",
                "category_id": "46c348b0-8989-4deb-8e43-8359897236c7",
                "category_name": "Gas",
                "transfer_account_id": null,
                "transfer_transaction_id": null,
                "matched_transaction_id": null,
                "import_id": "YNAB:-31690:2018-09-24:1",
                "deleted": false,
                "subtransactions": []
            }
        ],
        account: {
            "balance": 27550800,
            "cleared_balance": 27550800,
            "uncleared_balance": 0
        }
    }

    render() {
        const { account } = this.state
        return (
            <>
                <h1>Account Balance</h1>
                <Card>
                    <CardContent>
                        <Typography>${account.cleared_balance} - ${account.uncleared_balance} = ${account.balance}</Typography>
                    </CardContent>
                </Card>

                <TableContainer component={Paper}>
                    <Table aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Payee</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.transactions.map(transaction =>
                                <AccountBalanceItem {...transaction} key={transaction.id} />
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    }
}

export default AccountBalance;