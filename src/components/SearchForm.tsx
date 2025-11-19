import React from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

interface SearchFormProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
}

export const SearchForm = ({ searchValue, onSearchChange, onSubmit }: SearchFormProps) => (
  <Form onSubmit={onSubmit} className="mb-4">
    <InputGroup>
      <Form.Control
        placeholder="Поиск по наименованию"
        value={searchValue}
        onChange={(event) => onSearchChange(event.target.value)}
      />
      <Button variant="primary" type="submit">
        Поиск
      </Button>
    </InputGroup>
  </Form>
);
