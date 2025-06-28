import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Test the database connection
    await prisma.$connect();
    return NextResponse.json({ status: 'Connected to database successfully' });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to database' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}