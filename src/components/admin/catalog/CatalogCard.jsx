import { Pencil, Plus } from 'lucide-react';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Item, ItemActions, ItemGroup, ItemTitle } from '@/components/ui/item';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';

function CatalogCard({
  openModal,
  lists,
  type,
  openAlert,
  selectedOption,
  setSelectedOption,
  selectConfig,
}) {
  const fallback = (
    <div>
      <p className='ms-4'>No items under this </p>
    </div>
  );

  return (
    <Card>
      <CardHeader className='my-3'>
        {selectConfig && (
          <CardTitle>
            <Select
              value={selectedOption || ''}
              onValueChange={setSelectedOption}>
              <SelectTrigger className='w-full max-w-9/12'>
                <SelectValue placeholder={selectConfig.placeholder} />
              </SelectTrigger>
              <SelectContent position='popper'>
                <SelectGroup>
                  <SelectLabel>{selectConfig.label}</SelectLabel>
                  {selectConfig.options.map((s) => (
                    <SelectItem key={s._id} value={s._id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </CardTitle>
        )}
        <CardAction>
          <Button
            onClick={() => openModal(type)}
            variant='outline'
            className='w-32 text-gray-100 bg-blue-700 text-md hover:bg-blue-600 hover:text-gray-300 cursor-pointer'>
            <Plus />
            Add
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ItemGroup>
          {lists.length === 0 && selectedOption
            ? fallback
            : lists.map((s) => (
                <Item
                  key={s._id}
                  variant='outline'
                  className='w-full flex justify-between'>
                  <ItemTitle>{s.name}</ItemTitle>
                  <ItemActions>
                    <Button
                      onClick={() => openModal(type, s)}
                      className='w-32 text-gray-100 bg-blue-700 text-md hover:bg-blue-600 hover:text-gray-300 cursor-pointer'>
                      <Pencil /> Edit
                    </Button>
                    <Button
                      onClick={() => openAlert(type, s._id)}
                      variant='destructive'
                      className='w-32 cursor-pointer'>
                      Delete
                    </Button>
                  </ItemActions>
                </Item>
              ))}
        </ItemGroup>
      </CardContent>
    </Card>
  );
}

export default CatalogCard;
