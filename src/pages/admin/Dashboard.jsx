import { useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';

export default function Dashboard() {
  const { count } = useSelector((state) => state.products);

  return (
    <div className='grid grid-cols-3 gap-6'>
      <Card>
        <CardHeader>
          <CardTitle>Total Products</CardTitle>
        </CardHeader>
        <CardContent>{count}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Orders</CardTitle>
        </CardHeader>
        <CardContent>45</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent>230</CardContent>
      </Card>
    </div>
  );
}
