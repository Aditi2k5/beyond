import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Extract the search params from the request URL
  const { searchParams } = new URL(request.url);
  const term = searchParams.get('term');

  // Validate that term is provided
  if (!term) {
    return NextResponse.json(
      { error: 'Medical term is required' }, 
      { status: 400 }
    );
  }

  try {
    // Call the FastAPI backend
    const response = await fetch(
      `https://idk-540108306777.us-central1.run.app/medical-explanation?term=${term}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Check if the response is ok
    if (!response.ok) {
      throw new Error('Failed to fetch medical explanation');
    }

    // Parse and return the JSON response
    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    // Handle any errors during the fetch
    console.error('Error fetching medical explanation:', error);
    return NextResponse.json(
      { error: 'Unable to retrieve medical explanation' }, 
      { status: 500 }
    );
  }
}