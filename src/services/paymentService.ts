export type PaymentState = 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILED' | 'REFUNDED';

export interface PaymentDetails {
  bookingId: string;
  serviceName: string;
  professionalName: string;
  serviceCharge: number;
  platformFee: number;
  discount: number;
  total: number;
  paymentMethod: 'ONLINE' | 'CASH';
  status: PaymentState;
  transactionId?: string;
  timestamp: string;
  refundStatus?: 'NONE' | 'PROCESSING' | 'REFUNDED';
}

// Modular Payment Provider Gateway (e.g. Razorpay / UPI / Cash)
export const processPaymentGateway = async (
  method: 'ONLINE' | 'CASH',
  amount: number,
  onStatusChange: (status: PaymentState) => void
): Promise<{ success: boolean; transactionId: string }> => {
  onStatusChange('PROCESSING');
  
  // Simulate secure gateway latency
  await new Promise((resolve) => setTimeout(resolve, 1800));

  if (method === 'CASH') {
    onStatusChange('SUCCESS');
    return {
      success: true,
      transactionId: `CASH-PAY-${Math.floor(100000 + Math.random() * 900000)}`,
    };
  }

  // Online gateway success rate
  const success = Math.random() > 0.05; // 95% success
  if (success) {
    onStatusChange('SUCCESS');
    return {
      success: true,
      transactionId: `RZP-TXN-${Math.floor(100000000 + Math.random() * 900000000)}`,
    };
  } else {
    onStatusChange('FAILED');
    return {
      success: false,
      transactionId: '',
    };
  }
};
