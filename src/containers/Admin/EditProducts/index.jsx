import React, { useEffect, useState } from 'react';
import { Image } from '@phosphor-icons/react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import Select from 'react-select';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import {
  Container,
  Input,
  Form,
  InputGroup,
  LabelUpload,
  Label,
  SubmitButton,
  ErrorMessage,
  ContainerCheckbox,
} from './styles';

// Schema de validação
const schema = yup.object({
  name: yup.string().required('O nome do produto é obrigatório.'),
  price: yup
    .number()
    .positive('O preço deve ser um valor positivo.')
    .required('O preço do produto é obrigatório.')
    .typeError('Insira um valor válido para o preço.'),
  category: yup
    .object()
    .required('Selecione uma categoria para o produto.')
    .typeError('Selecione uma categoria válida.'),
  file: yup
    .mixed()
    .test('fileSize', 'O arquivo deve ter no máximo 3 MB.', (value) =>
      value?.length ? value[0]?.size <= 3 * 1024 * 1024 : true,
    )
    .test('fileType', 'O arquivo deve ser PNG ou JPEG.', (value) =>
      value?.length
        ? ['image/png', 'image/jpeg'].includes(value[0]?.type)
        : true,
    ),
  offer: yup.boolean(),
});

export function EditProduct() {
  const [fileName, setFileName] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const product = location?.state?.product || null;

  useEffect(() => {
    async function loadCategories() {
      try {
        const { data } = await api.get('/categories');
        const formattedCategories = data.map((category) => ({
          value: category.id,
          label: category.name,
        }));
        setCategories(formattedCategories);
      } catch (error) {
        toast.error('Erro ao carregar categorias.');
      }
    }
    loadCategories();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: product?.name || '',
      price: product ? product.price / 100 : '',
      category: product
        ? { value: product.category_id, label: product.category_name }
        : null,
      offer: product?.offer || false,
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('price', data.price * 100);
      formData.append('category_id', data.category.value);
      formData.append('file', data.file[0]);
      formData.append('offer', data.offer);

      await toast.promise(
        api.put(`/products/${product.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        }),
        {
          pending: 'Salvando alterações...',
          success: 'Produto atualizado com sucesso!',
          error: 'Erro ao atualizar o produto. Tente novamente.',
        },
      );
    } catch (error) {
      toast.error(
        'Ocorreu um erro inesperado. Verifique os dados e tente novamente.',
      );
    }
    setTimeout(() => {
      navigate('/admin/produtos');
    }, 2000);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Label>Nome</Label>
          <Input type="text" {...register('name')} />
          <ErrorMessage>{errors?.name?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <Label>Preço</Label>
          <Input type="number" step="0.01" {...register('price')} />
          <ErrorMessage>{errors?.price?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <LabelUpload>
            <ErrorMessage>{errors?.file?.message}</ErrorMessage>
            <Image />
            <input
              type="file"
              {...register('file')}
              accept="image/png, image/jpeg"
              onChange={(event) => {
                setFileName(event.target.files[0]?.name || null);
              }}
            />
            {fileName || 'Upload do Produto'}
          </LabelUpload>
        </InputGroup>

        <InputGroup>
          <Label>Categoria</Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={categories}
                placeholder="Selecione uma categoria"
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                }}
              />
            )}
          />
          <ErrorMessage>{errors?.category?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <ContainerCheckbox>
            <input type="checkbox" {...register('offer')} />
            <Label>Produto em Oferta?</Label>
          </ContainerCheckbox>
        </InputGroup>

        <SubmitButton type="submit">Editar Produto</SubmitButton>
      </Form>
    </Container>
  );
}
