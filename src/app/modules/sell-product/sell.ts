// /* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { cn } from "@/lib/utils";
// import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import { useActionState, useEffect, useState } from "react";
// import { toast } from "sonner";
// import { createOrder } from "@/services/cashier/ordersManagement";

// export function OrderCreateForm({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {
//   const [state, formAction, isPending] = useActionState(createOrder, null);

//   // Local product item state
//   const [productId, setProductId] = useState("");
//   const [price, setPrice] = useState("");
//   const [quantity, setQuantity] = useState("");

//   useEffect(() => {
//     if (state && !state.success && state.message) {
//       toast.error(state.message);
//     }
//   }, [state]);

//   return (
//     <div
//       className={cn(
//         "min-h-screen flex items-center justify-center bg-background",
//         className
//       )}
//       {...props}
//     >
//       <Card className="w-full max-w-2xl shadow-lg">
//         <CardContent className="p-6 md:p-8">
//           <form
//             action={async (formData: FormData) => {
//               // Build items array manually
//               const items = [
//                 {
//                   product: productId,
//                   quantity: Number(quantity),
//                   price: Number(price),
//                 },
//               ];

//               // Add items into FormData as JSON
//               formData.append("items", JSON.stringify(items));

//               // Call server action
//               await formAction(formData);
//             }}
//             className="space-y-6"
//           >
//             <div className="text-center">
//               <h1 className="text-2xl font-bold">Create Order</h1>
//               <p className="text-sm text-muted-foreground">Add a new Order</p>
//             </div>

//             <FieldGroup>
//               <Field>
//                 <FieldLabel htmlFor="customerId">Customer ID</FieldLabel>
//                 <Input
//                   id="customerId"
//                   name="customerId"
//                   placeholder="Customer ID"
//                   required
//                 />
//               </Field>

//               <Field>
//                 <FieldLabel htmlFor="customerName">Customer Name</FieldLabel>
//                 <Input
//                   id="customerName"
//                   name="customerName"
//                   placeholder="Customer Name"
//                   required
//                 />
//               </Field>

//               <Field>
//                 <FieldLabel htmlFor="barcode">Barcode</FieldLabel>
//                 <Input id="barcode" name="barcode" placeholder="1234567890" />
//               </Field>

//               {/* Product Info */}
//               <Field>
//                 <FieldLabel htmlFor="productId">Product ID</FieldLabel>
//                 <Input
//                   id="productId"
//                   placeholder="Product ID"
//                   value={productId}
//                   onChange={(e) => setProductId(e.target.value)}
//                   required
//                 />
//               </Field>

//               <Field>
//                 <FieldLabel htmlFor="price">Price</FieldLabel>
//                 <Input
//                   id="price"
//                   type="number"
//                   placeholder="Price"
//                   value={price}
//                   onChange={(e) => setPrice(e.target.value)}
//                 />
//               </Field>

//               <Field>
//                 <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
//                 <Input
//                   id="quantity"
//                   type="number"
//                   placeholder="Quantity"
//                   value={quantity}
//                   onChange={(e) => setQuantity(e.target.value)}
//                 />
//               </Field>

//               <Field>
//                 <FieldLabel htmlFor="paymentAmount">Payment Amount</FieldLabel>
//                 <Input
//                   id="paymentAmount"
//                   name="paymentAmount"
//                   type="number"
//                   defaultValue={0}
//                 />
//               </Field>
//               <Field>
//                 <FieldLabel htmlFor="changeAmount">Change Amount</FieldLabel>
//                 <Input
//                   id="changeAmount"
//                   name="changeAmount"
//                   type="number"
//                   defaultValue={0}
//                 />
//               </Field>

//               <Button type="submit" className="w-full" disabled={isPending}>
//                 {isPending ? "Creating..." : "Create Order"}
//               </Button>
//             </FieldGroup>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }








/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { createOrder } from "@/services/cashier/ordersManagement";

export function OrderCreateForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, formAction, isPending] = useActionState(createOrder, null);
 const [items, setItems] = useState<ICartItem[]>([]);
  // Local product item state
  const [productId, setProductId] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(0);
   // Item fields
  const [newProduct, setNewProduct] = useState("");
  const [newQuantity, setNewQuantity] = useState(1);
  const [newPrice, setNewPrice] = useState(0);
  // Total & Change Auto Calculated
  const totalAmount = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
const changeAmount = paymentAmount - totalAmount;
  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);
    // Add Item to List
  const handleAddItem = () => {
    if (!newProduct || newQuantity <= 0 || newPrice <= 0) {
      toast.error("Invalid item details!");
      return;
    }
    setItems([
      ...items,
      { product: newProduct, quantity: newQuantity, price: newPrice },
    ]);
    setNewProduct("");
    setNewQuantity(1);
    setNewPrice(0);
  };


  return (
    <div
      className={cn(
        "min-h-screen flex items-center justify-center bg-background",
        className
      )}
      {...props}
    >
      <Card className="w-full max-w-2xl shadow-lg">
        <CardContent className="p-6 md:p-8">
          <form
            action={async (formData: FormData) => {
              // Build items array manually
              const items = [
                {
                  product: productId,
                  quantity: Number(quantity),
                  price: Number(price),
                },
              ];

              // Add items into FormData as JSON
              formData.append("items", JSON.stringify(items));

              // Call server action
              await formAction(formData);
            }}
            className="space-y-6"
          >
            <div className="text-center">
              <h1 className="text-2xl font-bold">Create Order</h1>
              <p className="text-sm text-muted-foreground">Add a new Order</p>
            </div>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="customerId">Customer ID</FieldLabel>
                <Input
                  id="customerId"
                  name="customerId"
                  placeholder="Customer ID"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="customerName">Customer Name</FieldLabel>
                <Input
                  id="customerName"
                  name="customerName"
                  placeholder="Customer Name"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="barcode">Barcode</FieldLabel>
                <Input id="barcode" name="barcode" placeholder="1234567890" />
              </Field>

              {/* Product Info */}
              <Field>
                <FieldLabel htmlFor="productId">Product ID</FieldLabel>
                <Input
                  id="productId"
                  placeholder="Product ID"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="price">Price</FieldLabel>
                <Input
                  id="price"
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="paymentAmount">Payment Amount</FieldLabel>
                <Input
                  id="paymentAmount"
                  name="paymentAmount"
                  type="number"
                  defaultValue={0}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="changeAmount">Change Amount</FieldLabel>
                <Input
                  id="changeAmount"
                  name="changeAmount"
                  type="number"
                  defaultValue={0}
                />
              </Field>

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Creating..." : "Create Order"}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

