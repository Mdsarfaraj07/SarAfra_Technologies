'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { FadeIn } from '../fade-in';
import { Copy, Printer } from 'lucide-react';

type Tab = 'card' | 'upi' | 'ewallet';

const PaymentSection = () => {
  const [activeTab, setActiveTab] = useState<Tab>('card');
  const [paymentMessage, setPaymentMessage] = useState('');
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState<any>(null);
  const { toast } = useToast();
  
  const handlePayment = (e: React.FormEvent, method: string) => {
    e.preventDefault();
    setPaymentMessage('Processing payment...');

    setTimeout(() => {
        setPaymentMessage('Payment Successful! Generating invoice...');
        toast({
            title: "Payment Successful!",
            description: "Your invoice is being generated.",
        });
        generateInvoice(method);
        setShowInvoice(true);
    }, 2000);
  };

  const generateInvoice = (paymentMethod: string) => {
    // In a real app, this would use data from the cost estimator
    const generatedInvoice = {
        clientName: 'Client Name', // Placeholder
        clientEmail: 'mdsarfaraj9886@gmail.com',
        invoiceNumber: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
        invoiceDate: new Date().toLocaleDateString(),
        items: [{ name: 'Project Estimate', amount: 15000 }], // Placeholder
        totalAmount: 15000,
    };
    setInvoiceDetails(generatedInvoice);
  };

  const TabButton = ({ id, label }: { id: Tab; label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={cn(
        'px-2 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-muted-foreground rounded-t-lg transition-colors duration-200 focus:outline-none whitespace-nowrap',
        { 'text-foreground bg-card border-b-2 border-accent': activeTab === id }
      )}
    >
      {label}
    </button>
  );

  const copyToClipboard = () => {
    if (invoiceDetails) {
        const textToCopy = `
Invoice To: ${invoiceDetails.clientName}
Email: ${invoiceDetails.clientEmail}
Invoice #: ${invoiceDetails.invoiceNumber}
Date: ${invoiceDetails.invoiceDate}
---
Items:
${invoiceDetails.items.map((item: any) => `${item.name}: $${item.amount.toLocaleString()}`).join('\n')}
---
Total: $${invoiceDetails.totalAmount.toLocaleString()}
        `;
        navigator.clipboard.writeText(textToCopy.trim());
        toast({ title: 'Invoice details copied to clipboard!' });
    }
  }

  if (showInvoice && invoiceDetails) {
    return (
        <section id="payment" className="py-16 md:py-24">
             <div className="container mx-auto px-4 text-center">
                <FadeIn>
                    <div id="invoice-container" className="max-w-3xl mx-auto bg-card p-4 sm:p-8 rounded-lg shadow-md text-left mt-12">
                        <div id="invoice-print-area">
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold gradient-text">Invoice</h3>
                                <p className="text-sm text-muted-foreground">SarAfra Technologies</p>
                                <p className="text-sm text-muted-foreground">123 Digital Way, Innovation City, 12345</p>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between mb-8 text-sm">
                                <div className="mb-4 sm:mb-0">
                                    <p className="text-muted-foreground font-semibold">Invoice To:</p>
                                    <p>{invoiceDetails.clientName}</p>
                                    <p>{invoiceDetails.clientEmail}</p>
                                </div>
                                <div className="text-left sm:text-right">
                                    <p className="text-muted-foreground font-semibold">Invoice #:</p>
                                    <p>{invoiceDetails.invoiceNumber}</p>
                                    <p className="text-muted-foreground font-semibold mt-2">Invoice Date:</p>
                                    <p>{invoiceDetails.invoiceDate}</p>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="border-b">
                                        <tr>
                                            <th className="py-2 text-muted-foreground">Description</th>
                                            <th className="py-2 text-right text-muted-foreground">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-foreground">
                                    {invoiceDetails.items.map((item: any, index: number) => (
                                        <tr key={index}>
                                            <td className="py-2">{item.name}</td>
                                            <td className="py-2 text-right">${item.amount.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-end mt-8 border-t pt-4">
                                <div className="text-right font-semibold">
                                    <p className="text-xl">Total: <span className="gradient-text ml-2">${invoiceDetails.totalAmount.toLocaleString()}</span></p>
                                </div>
                            </div>
                            <div className="text-center text-sm text-muted-foreground mt-8">
                                Thank you for your business!
                            </div>
                        </div>
                        <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                            <Button onClick={() => window.print()} className="btn-primary rounded-full"><Printer className="mr-2 h-4 w-4" />Print Invoice</Button>
                            <Button onClick={copyToClipboard} className="btn-primary rounded-full"><Copy className="mr-2 h-4 w-4" />Copy Details</Button>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
  }

  return (
    <section id="payment" className="py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Secure Payment</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">Complete your payment securely. We accept all major payment methods.</p>
        </FadeIn>
        <FadeIn>
            <Card className="max-w-xl mx-auto p-4 sm:p-8 text-left">
                <div className="flex space-x-1 border-b mb-6 overflow-x-auto">
                    <TabButton id="card" label="Credit Card" />
                    <TabButton id="upi" label="UPI / QR Code" />
                    <TabButton id="ewallet" label="E-Wallet" />
                </div>

                <div className={cn({ 'hidden': activeTab !== 'card' })}>
                    <form onSubmit={(e) => handlePayment(e, 'Credit Card')} className="space-y-6">
                        <div>
                            <Label htmlFor="cardNumber" className="sr-only">Card Number</Label>
                            <Input type="text" id="cardNumber" placeholder="Card Number" required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="expiryDate" className="sr-only">Expiry Date</Label>
                                <Input type="text" id="expiryDate" placeholder="MM/YY" required />
                            </div>
                            <div>
                                <Label htmlFor="cvv" className="sr-only">CVV</Label>
                                <Input type="text" id="cvv" placeholder="CVV" required />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="cardName" className="sr-only">Name on Card</Label>
                            <Input type="text" id="cardName" placeholder="Name on Card" required />
                        </div>
                        <Button type="submit" className="w-full btn-primary font-medium rounded-full">Pay with Credit Card</Button>
                    </form>
                </div>

                <div className={cn('text-center', { 'hidden': activeTab !== 'upi' })}>
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Scan to Pay</h3>
                    <div className="flex justify-center mb-6">
                        <Image src="https://res.cloudinary.com/dazw9kv1l/image/upload/v1722872365/qr_code_z5p1vr.png" alt="Placeholder QR Code" data-ai-hint="qr code" width={200} height={200} className="rounded-lg shadow-md border" />
                    </div>
                    <p className="text-muted-foreground mb-2">Or enter your UPI ID:</p>
                    <div className="flex items-center mb-6">
                        <Input type="text" id="upiId" placeholder="your_upi_id@bank" className="flex-grow" />
                    </div>
                    <Button onClick={(e) => handlePayment(e, 'UPI')} className="w-full btn-primary font-medium rounded-full">Pay with UPI</Button>
                </div>

                <div className={cn({ 'hidden': activeTab !== 'ewallet' })}>
                    <h3 className="text-xl font-semibold mb-4 text-center text-foreground">Pay with E-Wallet</h3>
                    <div className="mb-6">
                        <Label htmlFor="eWalletProvider" className="sr-only">E-Wallet Provider</Label>
                        <Select>
                            <SelectTrigger><SelectValue placeholder="Select E-Wallet Provider" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="paypal">PayPal</SelectItem>
                                <SelectItem value="stripe">Stripe</SelectItem>
                                <SelectItem value="gpay">Google Pay</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button onClick={(e) => handlePayment(e, 'E-Wallet')} className="w-full btn-primary font-medium rounded-full">Pay with E-Wallet</Button>
                </div>
                 {paymentMessage && <p className="mt-4 text-center font-medium text-green-400">{paymentMessage}</p>}
            </Card>
        </FadeIn>
      </div>
    </section>
  );
};

export default PaymentSection;
