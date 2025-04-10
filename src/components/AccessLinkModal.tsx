'use client';

import { useState } from 'react';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {sendEmail, Email} from '@/services/email';
import {useToast} from '@/hooks/use-toast';
import {Icons} from '@/components/icons';
import {generateAccessCode} from '@/ai/flows/generate-access-code';
import {generateRandomHash} from '@/lib/utils';
import { User } from 'lucide-react';

interface AccessLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccessLinkModal: React.FC<AccessLinkModalProps> = ({isOpen, onClose}) => {
  const [email, setEmail] = useState('');
  const [hashCode, setHashCode] = useState('');
  const [isPasscodeSent, setIsPasscodeSent] = useState(false);
  const [generatedHash, setGeneratedHash] = useState('');
  const {toast} = useToast();

  const handleEmailRequest = async () => {
    setLoading(true);
    if (!email) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter a valid email address.',
      });
      setLoading(false);
      return;
    }

    try {
      const result = await generateAccessCode({email});

      if (result && result.emailSent) {
        toast({
          title: 'Success',
          description: `Access granted! A hash code will be sent to ${email}.`,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to send email. Please try again later.',
        });
      }
    } catch (error) {
      console.error('Error generating access code:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate access code. Please try again later.',
      });
    }

    setLoading(false);
  };

  const generateAndSendHashCode = async () => {
    setLoading(true);
    const newHash = generateRandomHash(6);
    setGeneratedHash(newHash);

    try {
      const emailParams: Email = {
        to: email,
        subject: 'Your Access Passcode',
        html: `<p>Your access passcode is: <strong>${newHash}</strong></p>`,
      };

      await sendEmail(emailParams);

      toast({
        title: 'Hash Code Generated and Sent',
        description: `A hash code has been generated and sent to ${email}.`,
      });
      setIsPasscodeSent(true);
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to send email with hash code. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };



  const handleHashCodeAccess = () => {
    if (!hashCode || hashCode !== generatedHash) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter a valid hash code.',
      });
      return;
    }

    toast({
      title: 'Success',
      description: `Access granted with hash code: ${hashCode}`,
    });

    onClose();
  };
  const [loading, setLoading] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto flex flex-col">
        <DialogHeader>
          <DialogTitle>Request Access</DialogTitle>
          <DialogDescription>Choose your preferred access method</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="email">Enter Your Email:</Label>
          <Input
            type="email"
            id="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button
          className="w-full"
          onClick={generateAndSendHashCode}
          disabled={loading || !email}
        >
          {loading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Generate Passcode and Send to Email'
          )}
        </Button>

        {isPasscodeSent && (
          <div className="mt-4 space-y-2">
            <Label htmlFor="passcode">Enter Received Passcode:</Label>
            <Input
              type="text"
              id="passcode"
              placeholder="Passcode"
              value={hashCode}
              onChange={(e) => setHashCode(e.target.value)}
            />
            <Button className="w-full" onClick={handleHashCodeAccess}>
              Submit Passcode and Access Link
            </Button>
          </div>
        )}




        <DialogClose asChild>
          <Button variant="secondary" className="mt-4">
            Cancel
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default AccessLinkModal;
