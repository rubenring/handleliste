#API:

## PRODUCTS

/users

```
{
    id: uuid,
    name: string,
    email: string
}
```

/products

```
{
    id: uuid,
    qttype: QTTYPE,
    qtnumber: string
}
```

/shoppinglists

```
{
    id: uuid,
    products: Array<{
        id: uuid,
        qty: number
    }>
}
```
