import {
  Box,
  Dialog,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { IItem } from "../components/ProductItem";
import { Add, AddBox, Delete, Edit, PlusOne } from "@mui/icons-material";
import {
  IProduct,
  createAProduct,
  deleteAProduct,
  fetchProductList,
  getProductLength,
} from "../utils/productController";
import EditProduct from "../components/EditProduct";

type Ievent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

const Products = () => {
  const initNewProductState = {
    id: 0,
    name: "",
    description: "",
    price: 0,
    imgUrl: "",
    createBy: "string",
    editedBy: "string",
  };
  const [productList, setProductList] = useState<IProduct[]>([]);
  const [listLimit, setListLimit] = useState(5);
  const [newProduct, setNewProduct] = useState<IProduct>(initNewProductState);
  const [currProduct, setCurrProduct] = useState<IProduct>(initNewProductState);
  const [showAddNewProduct, setShowAddNewProduct] = useState(false);
  const [listLength, setListLength] = useState(0);
  const [modalopen, setmodalOpen] = useState(false);
  const handlemodalOpen = () => setmodalOpen(true);
  const handlemodalClose = () => setmodalOpen(false);

  const fetchList = () => {
    fetchProductList(0, listLimit)
      .then((result) => {
        setProductList(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchList();
    getProductLength()
      .then((result) => {
        setListLength(result);
      })
      .catch((err) => {});
  }, []);
  return (
    <Box>
      <Dialog
        open={modalopen}
        onClose={() => handlemodalClose()}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <EditProduct
          product={currProduct}
          onclose={() => {
            setmodalOpen(false);
          }}
        />
      </Dialog>
      <Typography variant="h6">Product List</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Product">
          <TableHead>
            <TableRow>
              <TableCell>
                <IconButton
                  onClick={() => setShowAddNewProduct(!showAddNewProduct)}
                  color="primary"
                >
                  <Add />
                </IconButton>
              </TableCell>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price (&euro;)</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Edited By</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showAddNewProduct ? (
              <TableRow>
                <TableCell>
                  <IconButton
                    onClick={async () => {
                      await createAProduct(newProduct)
                        .then((result) => {
                          console.log(result);
                          setNewProduct(initNewProductState);
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                      fetchList();
                      setShowAddNewProduct(!showAddNewProduct);
                    }}
                    color="primary"
                  >
                    <AddBox />
                  </IconButton>
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <TextField
                    sx={{ width: 100 }}
                    label="Name"
                    variant="outlined"
                    onChange={(e: Ievent) => {
                      let newP = newProduct;
                      newP.name = e.target.value.toString();
                      setNewProduct(newP);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    sx={{ width: 100 }}
                    label="Description"
                    variant="outlined"
                    onChange={(e: Ievent) => {
                      let newP = newProduct;
                      newP.description = e.target.value.toString();
                      setNewProduct(newP);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    sx={{ width: 70 }}
                    type="number"
                    label="Price"
                    variant="outlined"
                    onChange={(e: Ievent) => {
                      let newP = newProduct;
                      newP.price = Number(e.target.value);
                      setNewProduct(newP);
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    label="Image"
                    variant="outlined"
                    onChange={(e: Ievent) => {
                      let newP = newProduct;
                      if (e.target.value.toString() === "") {
                        newP.imgUrl = e.target.defaultValue.toString();
                      } else {
                        newP.imgUrl = e.target.value.toString();
                      }
                      setNewProduct(newP);
                    }}
                  />
                </TableCell>
                <TableCell>{newProduct.createBy}</TableCell>
                <TableCell>{newProduct.editedBy}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ) : (
              <></>
            )}
            {productList.map((p, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        setCurrProduct(p);
                        handlemodalOpen();
                      }}
                      color="primary"
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell>{p.id}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.description}</TableCell>
                  <TableCell>{p.price}</TableCell>
                  <TableCell>
                    <img src={p.imgUrl} alt={p.name} width={100} height={100} />
                  </TableCell>
                  <TableCell>{p.createBy}</TableCell>
                  <TableCell>{p.editedBy}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={async () => {
                        await deleteAProduct(p.id);
                        fetchList();
                      }}
                      color="error"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <IconButton
            disabled={listLimit <= listLength ? false : true}
            onClick={async () => {
              let limit = listLimit;
              limit += 5;
              setListLimit(limit);
              fetchList();
            }}
            color="primary"
          >
            <Add />
          </IconButton>
        </Box>
      </TableContainer>
    </Box>
  );
};

export default Products;
