import React, { useEffect, useState } from 'react';
import { Image } from '@phosphor-icons/react';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Select from 'react-select'; // Importando o Select correto
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
    .number()
    .required('Selecione uma categoria para o produto.')
    .typeError('Selecione uma categoria válida.'),
  offer: yup.bool(),
  file: yup
    .mixed()
    .test('required', 'É necessário fazer o upload de um arquivo.', (value) => {
      return value && value.length > 0;
    })
    .test('fileSize', 'O arquivo deve ter no máximo 3 MB.', (value) => {
      return value && value.length > 0 && value[0].size <= 3 * 1024 * 1024; // 3MB
    })
    .test('type', 'O arquivo deve ser uma imagem PNG ou JPEG.', (value) => {
      return (
        value &&
        value.length > 0 &&
        ['image/jpeg', 'image/png'].includes(value[0].type)
      );
    }),
});

export function NewProducts() {
  const [fileName, setFileName] = useState(null);
  const [categories, setCategories] = useState([]);

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
        console.error('Erro ao carregar categorias:', error);
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
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('price', data.price * 100);
      formData.append('category_id', data.category.id);
      formData.append('file', data.file[0]);
      formData.append('offer', data.offer);

      await api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Produto adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      alert('Erro ao adicionar produto. Tente novamente.');
    }
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
                register('file').onChange(event);
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
                menuPortalTarget={document.body} // Para evitar problemas de renderização com portais
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Garante o z-index correto
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

        <SubmitButton type="submit">Adicionar Produto</SubmitButton>
      </Form>
    </Container>
  );
}
