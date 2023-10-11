import { getAllGelombang } from "@/helpers/getAllGelombang";
import {
  Alert,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const TabelDataDosen = ({ user }: any) => {
  const router = useRouter();
  const [dosen, setDosen]: any = useState([]);

  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getDosen = async () => {
    try {
      const res = await axios.get("/api/pembimbing")
      // console.log(res)
      setDosen(res.data.data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDosen();
  });

  // console.log(dosen)

  return (
    <>
      <Stack spacing={5}>
        {loading ? (
          <Alert status="info">
            <Spinner />
            Loading....
          </Alert>
        ) : null}
        <TableContainer bg={"white"}>
          <Table>
            <Thead>
              <Tr>
                <Th>No</Th>
                <Th>Nama Dosen Pembimbing</Th>
                <Th>Nomor Induk</Th>
                <Th>Gender</Th>
                <Th>Role</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dosen.map((item: any, index: any) => (
                <Tr key={item._id}>
                  <Td>{index + 1}</Td>
                  <Td>{item.nama}</Td>
                  <Td>{item.kode}</Td>
                  <Td>{item.gender}</Td>
                  <Td>Dosen Pembimbing</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Stack>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent></ModalContent>
      </Modal>
    </>
  );
};

export default TabelDataDosen;
