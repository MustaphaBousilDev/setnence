import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import jsPDF from "jspdf";
const PaymentService = () => {
  const { id } = useParams();
  // Define a query key, which includes the 'id'
  const queryKey = ['payment', id];

  // Fetch data using React Query
  const { data: paymentData, isLoading, isError } = useQuery(queryKey, async () => {
    // Make the API call to fetch apartment data based on the 'id'
    const response = await axios.get(`http://localhost:4000/api/v1/payment/${localStorage.getItem('token')}/${id}`); // Replace with your actual API endpoint
    return response.data; // Assuming the data is in the 'data' property of the response
  });
  useEffect(() => {
    if (!isLoading && !isError && paymentData) {
      // Map specific properties from appertementData.data to oldData
      let updatedOldData = {
        client: paymentData.data.client || '',
        appartement: paymentData.data.appartement || 0,
        montant: paymentData.data.montant || 0,
        _id:id
      };

      setPaymentEdit(updatedOldData)
    }
  }, [isLoading, isError,id]);
  const navigate=useNavigate()
  const [payment,setPayment]=useState({
    client:'',
    appartement:'',
    montant:''
  })
  const [paymentEdit,setPaymentEdit]=useState({
    _id:id,
    client:'',
    appartement:'',
    montant:''
  })
  const mutation = useMutation((data) => {
    return axios
       .post(`http://localhost:4000/api/v1/payment/${localStorage.getItem('token')}`, data); // Replace '/api/your-endpoint' with your actual API endpoint
  });
  const mutationEdit = useMutation((data) => {
    return axios
       .patch(`http://localhost:4000/api/v1/payment/${localStorage.getItem('token')}`, data); // Replace '/api/your-endpoint' with your actual API endpoint
  });
  const handleSubmit =async  (e) => {
    //console.log('submit')
    e.preventDefault()
    //console.log(payment)
    //send data to store in database using mutate reactQuery
    try {
      // Call the mutation function with the data you want to send
      await mutation.mutateAsync(payment);
      // Optionally, you can handle success or navigate to a different page
      navigate('/dashboard/paiement')
    } catch (error) {
      console.error('Error sending data:', error);
      // Handle error as needed
    }
  }
  const handleSubmitEdit =async  (e) => {
    console.log('submit')
    e.preventDefault()
    //send data to store in database using mutate reactQuery
    try {
      // Call the mutation function with the data you want to send
      await mutationEdit.mutateAsync(paymentEdit);
      // Optionally, you can handle success or navigate to a different page
      navigate('/dashboard/paiement')
    } catch (error) {
      console.error('Error sending data:', error);
      // Handle error as needed
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
    //console.log(payment)
  };
  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setPaymentEdit({ ...paymentEdit, [name]: value });
    // console.log(paymentEdit)
  };
  const handlePrint = (e) => {
    const objectData = {
      client: e.client,
      appartement: e.appartement,
      montant: e.montant,
      datePaiement: e.datePaiement,
    };

    const pdf = new jsPDF();

    pdf.setFontSize(18);
    pdf.setFont("helvetica", "bold");
    pdf.text("Receipt Payment Details", 10, 10);

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");

    const formattedData = Object.entries(objectData)
      .map(([key, value]) => `${key} : ${value}`)
      .join(
        "\n\n__________________________________________________________________________\n\n"
      );

    pdf.text(formattedData, 10, 20);

    pdf.save(`${e.client}.pdf`);
  };

  return {
    payment,
    setPayment,
    handleChange,
    handleSubmit,
    handleSubmitEdit,
    handleChangeEdit,
    paymentData,
    handlePrint
  }

}

export default PaymentService