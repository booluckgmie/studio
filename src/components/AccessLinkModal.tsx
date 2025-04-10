'use client';

<<<<<<< HEAD
import { useState, useEffect } from 'react';
=======
import {useState} from 'react';
>>>>>>> parent of 21c3b7d (create app_hashcode)
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogClose} from '@/components/ui/dialog';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {sendEmail, Email} from '@/services/email';
import {useToast} from '@/hooks/use-toast';
import {Icons} from '@/components/icons';
import {generateAccessCode} from '@/ai/flows/generate-access-code';
<<<<<<< HEAD
import { User } from 'lucide-react';
=======
import {Progress} from '@/components/ui/progress';
>>>>>>> parent of 21c3b7d (create app_hashcode)

interface AccessLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccessLinkModal: React.FC<AccessLinkModalProps> = ({isOpen, onClose}) => {
  const [email, setEmail] = useState('');
  const [hashCode, setHashCode] = useState('');
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
  const [generatedHash, setGeneratedHash] = useState('');
=======
>>>>>>> parent of 21c3b7d (create app_hashcode)
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

<<<<<<< HEAD
  const [isPasscodeSent, setIsPasscodeSent] = useState(false);

  const generateAndSendHashCode = async () => {
    setLoading(true);
    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Passcode Sent',
          description: 'A passcode has been sent to your email.',
        });
        setIsPasscodeSent(true);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: data.error || 'Failed to send email.',
        });
      }
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



=======
>>>>>>> parent of 21c3b7d (create app_hashcode)
  const handleHashCodeAccess = () => {
    if (!hashCode) {
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
<<<<<<< HEAD
    onClose();
  };
=======
    window.open('https://www.google.com', '_blank');
    onClose();
  };

>>>>>>> parent of 21c3b7d (create app_hashcode)
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto flex flex-col">
        <DialogHeader>
          <DialogTitle>Request Access</DialogTitle>
          <DialogDescription>Choose your preferred access method</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="email" className="w-full">
          <TabsList>
            <TabsTrigger value="email">
              <Icons.mail className="mr-2 h-4 w-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="hash">
              <Icons.shield className="mr-2 h-4 w-4" />
              Hash Code
            </TabsTrigger>
          </TabsList>
          <TabsContent value="email" className="space-y-2">
            <Label htmlFor="email">Enter Your Email:</Label>
            <Input
              type="email"
              id="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button className="w-full" onClick={handleEmailRequest}>
              Request Access
            </Button>
            {loading && <Progress className="w-full mt-2" />}
          </TabsContent>
          <TabsContent value="hash" className="space-y-2">
            <Label htmlFor="hash">Enter Hash Code:</Label>
            <Input
              type="text"
              id="hash"
              placeholder="Hash Code"
              value={hashCode}
              onChange={(e) => setHashCode(e.target.value)}
            />
            <Button className="w-full" onClick={handleHashCodeAccess}>
              Access Directly
            </Button>
          </TabsContent>
        </Tabs>
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
