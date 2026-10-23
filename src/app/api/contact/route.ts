import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request body." },
        { status: 400 }
      );
    }
    const { name, email, subject, message } = body || {};

    // 1. Rigorous Field Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Please enter your name." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Please enter your message." },
        { status: 400 }
      );
    }

    // 2. Real Email Delivery Integration via Secure Server-Side Forwarding
    // Recipient address explicitly designated as provided by portfolio owner
    const targetRecipient = "Nikita.26bbin0189@jecrcu.edu.in";
    const web3FormsKey = process.env.WEB3FORMS_ACCESS_KEY;
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;

    if (web3FormsKey) {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3FormsKey,
          to_email: targetRecipient,
          name: name.trim(),
          email: email.trim(),
          replyto: email.trim(),
          subject: subject ? subject.trim() : "New Inquiry via Biotechnology Portfolio",
          message: message.trim(),
          from_name: "Nikita Singhal Portfolio Contact Form",
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        return NextResponse.json({
          success: true,
          message: `Your message has been delivered to ${targetRecipient}.`,
        });
      } else {
        return NextResponse.json(
          {
            success: false,
            error: data.message || "Failed to deliver message via Web3Forms service.",
          },
          { status: 502 }
        );
      }
    } else if (formspreeEndpoint) {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          recipient: targetRecipient,
          name: name.trim(),
          email: email.trim(),
          _replyto: email.trim(),
          subject: subject ? subject.trim() : "New Inquiry via Biotechnology Portfolio",
          message: message.trim(),
        }),
      });

      if (response.ok) {
        return NextResponse.json({
          success: true,
          message: `Your message has been delivered to ${targetRecipient}.`,
        });
      } else {
        return NextResponse.json(
          {
            success: false,
            error: "Failed to deliver message via Formspree.",
          },
          { status: 502 }
        );
      }
    } else {
      // No service credentials configured yet in .env.local
      // Do not falsely report success. Return clear unconfigured status.
      return NextResponse.json(
        {
          success: false,
          configured: false,
          targetEmail: targetRecipient,
          error:
            `Email delivery endpoint is currently awaiting configuration by the portfolio owner. Please add WEB3FORMS_ACCESS_KEY or FORMSPREE_ENDPOINT to .env.local to enable direct delivery to ${targetRecipient}.`,
        },
        { status: 503 }
      );
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json(
      { success: false, error: `Server error: ${errorMsg}` },
      { status: 500 }
    );
  }
}
