import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function FormCard({ title, children, contentClassName = '', ...props }) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className={contentClassName}>{children}</CardContent>
    </Card>
  );
}

export default FormCard;
