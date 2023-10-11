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

const TabelDataMahasiswa = ({ user }: any) => {
  const router = useRouter();
  const [mahasiswa, setMahasiswa]: any = useState([]);

  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getMahasiswa = async () => {
    try {
      const res = await axios.get("/api/users/mahasiswa");
      setMahasiswa(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMahasiswa();
  });

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
                <Th>Nama Mahasiswa</Th>
                <Th>NIM</Th>
                <Th>Angkatan</Th>
                <Th>Gender</Th>
                <Th>Dosen Pembimbing 1</Th>
                <Th>Dosen Pembimbing 2</Th>
              </Tr>
            </Thead>
            <Tbody>
              {mahasiswa.map((item: any, index: any) => (
                <Tr key={item._id}>
                  <Td>{index + 1}</Td>
                  <Td>{item._doc.nama}</Td>
                  <Td>{item._doc.kode}</Td>
                  <Td>{item._doc.angkatan}</Td>
                  <Td>{item._doc.gender}</Td>
                  <Td>{item.pembimbing1.nama}</Td>
                  <Td>{item.pembimbing2.nama}</Td>
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

export default TabelDataMahasiswa;
