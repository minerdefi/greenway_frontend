"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ChevronDownIcon, ChevronUpIcon, MapPinIcon, UserIcon, BuildingIcon, Download, Share2, ArrowLeft } from "lucide-react";

// Import Leaflet components dynamically with no SSR to avoid SSR issues
const LeafletMap = dynamic(() => import('@/components/tracking/leaflet-map'), {
    ssr: false,
    loading: () => (
        <div className="h-[250px] bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="animate-pulse text-gray-500">Loading map...</div>
        </div>
    )
});

// Simple progress bar component
const ShipmentProgressBar = ({ status }: { status: string }) => {
    const statusOrder = ["processing", "in-transit", "delivered"];
    const currentIndex = statusOrder.indexOf(status);

    return (
        <div className="relative mb-10">
            <div className="overflow-hidden h-2 mb-1 text-xs flex bg-gray-200 rounded-full">
                <div
                    className={cn(
                        "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-light transition-all duration-500",
                        status === "processing" && "w-[10%]",
                        status === "in-transit" && "w-[50%]",
                        status === "delivered" && "w-full"
                    )}
                ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 px-1">
                <span className={cn(currentIndex >= 0 ? "font-medium text-green-dark" : "")}>Processing</span>
                <span className={cn(currentIndex >= 1 ? "font-medium text-green-dark" : "")}>In Transit</span>
                <span className={cn(currentIndex >= 2 ? "font-medium text-green-dark" : "")}>Delivered</span>
            </div>
        </div>
    );
};

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
    return (
        <div className={cn(
            "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
            status === "delivered" && "bg-green-100 text-green-800",
            status === "in-transit" && "bg-blue-100 text-blue-800",
            status === "processing" && "bg-yellow-100 text-yellow-800"
        )}>
            <span className={cn(
                "h-1.5 w-1.5 rounded-full mr-1.5",
                status === "delivered" && "bg-green-600",
                status === "in-transit" && "bg-blue-600",
                status === "processing" && "bg-yellow-600"
            )}></span>
            {status === "delivered" ? "Delivered" :
                status === "in-transit" ? "In Transit" :
                    "Processing"}
        </div>
    );
};

// Clearance status badge component
const ClearanceStatusBadge = ({ status }: { status: string }) => {
    return (
        <div className={cn(
            "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
            status === "cleared" && "bg-green-100 text-green-800",
            status === "in-progress" && "bg-blue-100 text-blue-800",
            status === "pending" && "bg-yellow-100 text-yellow-800",
            status === "held" && "bg-red-100 text-red-800"
        )}>
            <span className={cn(
                "h-1.5 w-1.5 rounded-full mr-1.5",
                status === "cleared" && "bg-green-600",
                status === "in-progress" && "bg-blue-600",
                status === "pending" && "bg-yellow-600",
                status === "held" && "bg-red-600"
            )}></span>
            {status === "cleared" ? "Cleared" :
                status === "in-progress" ? "In Progress" :
                    status === "pending" ? "Pending" : "Held"}
        </div>
    );
};

// Barcode component for tracking number
const BarcodeDisplay = ({ value }: { value: string }) => {
    // Add null check and fallback for the value prop
    const displayValue = value || '';

    return (
        <div className="flex flex-col items-center my-3">
            <div className="bg-white/15 backdrop-blur-sm p-3 rounded-lg">
                <svg
                    id="barcode"
                    width="240"
                    height="60"
                    viewBox="0 0 240 60"
                    className="max-w-full"
                >
                    {/* Simple visual barcode representation */}
                    {displayValue.split('').map((char, index) => {
                        // Generate a pseudo-random bar width based on character code
                        const barWidth = (char.charCodeAt(0) % 4) + 1;
                        const spacing = index * 8;
                        return (
                            <rect
                                key={index}
                                x={spacing}
                                y="5"
                                width={barWidth}
                                height="40"
                                fill="white"
                            />
                        );
                    })}
                </svg>
                <div className="text-center text-xs font-mono mt-1 text-white">{displayValue}</div>
            </div>
        </div>
    );
};

// Function to extract location data from a location string
function extractLocationData(location: string): { city: string; region: string; country: string } {
    let city = "";
    let region = "";
    let country = "";

    if (!location) return { city, region, country };

    const parts = location.split(',').map(part => part.trim());

    if (parts.length === 1) {
        city = parts[0];
    } else if (parts.length === 2) {
        city = parts[0];
        if (parts[1].length <= 3) {
            region = parts[1];
        } else {
            country = parts[1];
        }
    } else if (parts.length >= 3) {
        city = parts[0];
        region = parts[1];
        country = parts[2];
    }

    return { city, region, country };
}

// Function to get coordinates for a location using Geocoding API
async function getCoordinates(location: string): Promise<[number, number] | null> {
    try {
        const { city, region, country } = extractLocationData(location);
        const query = [city, region, country].filter(Boolean).join(", ");

        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data && data.length > 0) {
            return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        }
        return null;
    } catch (error) {
        console.error("Error geocoding location:", error);
        return null;
    }
}

// Format currency with appropriate symbol
function formatCurrency(amount: number | string | undefined | null, currency: string = 'USD'): string {
    // If amount is undefined, null, or not a valid number, return a default value
    if (amount === undefined || amount === null) {
        return '$0.00'; // Return default formatted value
    }

    // Convert to number if it's a string
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

    // Check if conversion resulted in a valid number
    if (isNaN(numericAmount)) {
        return '$0.00'; // Return default if NaN
    }

    const currencySymbols: Record<string, string> = {
        USD: '$',
        EUR: '€',
        GBP: '£',
        JPY: '¥',
        CAD: 'C$',
        AUD: 'A$',
        CNY: '¥',
    };

    const symbol = currencySymbols[currency] || '$';

    return `${symbol}${numericAmount.toFixed(2)}`;
}

// Helper function to safely calculate total amount
function calculateTotalAmount(payment: any): number {
    if (!payment) return 0;

    // Convert each value to number or default to 0 if invalid
    const safeNumber = (value: any) => {
        if (value === undefined || value === null) return 0;
        const num = typeof value === 'string' ? parseFloat(value) : Number(value);
        return isNaN(num) ? 0 : num;
    };

    return (
        safeNumber(payment.shipping) +
        safeNumber(payment.insurance) +
        safeNumber(payment.customsDuties) +
        safeNumber(payment.taxes) +
        safeNumber(payment.additionalFees)
    );
}

// Generate a professional document with letterhead for printing
function generatePrintableDocument(shipment: any, type: 'details' | 'invoice'): string {
    const formatDate = new Date().toLocaleString();
    const logoUrl = typeof window !== 'undefined' ?
        `${window.location.origin}/images/greenway_logo.png` :
        '/images/greenway_logo.png';

    // Updated styles to fit document on page properly
    const styles = `
        <style>
            @page {
                size: A4;
                margin: 1.5cm;
            }
            body {
                font-family: Arial, sans-serif;
                color: #333;
                line-height: 1.3;
                margin: 0;
                padding: 0;
                font-size: 10pt;
                zoom: 0.9;
            }
            .container {
                max-width: 100%;
                margin: 0 auto;
                padding: 10px;
            }
            .letterhead {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-bottom: 15px;
                border-bottom: 1px solid #155D36;
                margin-bottom: 15px;
            }
            .logo {
                max-height: 45px;
            }
            .document-title {
                font-size: 18px;
                color: #0A3622;
                margin: 15px 0;
                text-align: center;
                font-weight: bold;
            }
            .section {
                margin-bottom: 15px;
                page-break-inside: avoid;
            }
            .section-title {
                font-size: 13px;
                font-weight: bold;
                color: #155D36;
                margin-bottom: 6px;
                border-bottom: 1px solid #e0e0e0;
                padding-bottom: 3px;
            }
            .info-group {
                margin-bottom: 8px;
            }
            .info-label {
                font-weight: bold;
                color: #555;
                font-size: 9pt;
            }
            .info-value {
                margin-top: 2px;
                font-size: 9pt;
            }
            .footer {
                margin-top: 20px;
                padding-top: 10px;
                border-top: 1px solid #e0e0e0;
                font-size: 8pt;
                color: #777;
                text-align: center;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 10px;
                font-size: 9pt;
            }
            table th, table td {
                border: 1px solid #ddd;
                padding: 4px 6px;
                text-align: left;
            }
            table th {
                background-color: #f5f5f5;
            }
            .totals-table {
                width: 40%;
                margin-left: auto;
            }
            .totals-table td {
                border: none;
                padding: 3px 6px;
            }
            .totals-table .total-row {
                font-weight: bold;
                border-top: 1px solid #ddd;
            }
            .eco-badge {
                background-color: #e8f5e9;
                color: #2e7d32;
                padding: 3px 6px;
                border-radius: 3px;
                display: inline-block;
                margin-top: 10px;
                font-size: 8pt;
            }
            .col-layout {
                display: flex;
                width: 100%;
            }
            .col {
                flex: 1;
                padding-right: 8px;
            }
            @media print {
                .no-print {
                    display: none;
                }
                body {
                    zoom: 0.9;
                }
                table { page-break-inside: avoid; }
                tr { page-break-inside: avoid; }
            }
        </style>
        <script>
            // Script to auto-adjust print size
            window.onload = function() {
                document.body.style.zoom = "0.85";
            };
        </script>
    `;

    const letterhead = `
        <div class="letterhead">
            <img src="${logoUrl}" alt="Greenway Logistics" class="logo">
            <div>
                <div style="font-weight: bold; color: #0A3622;">Greenway Logistics</div>
                <div>123 Eco Way, Greenville, CA 94123</div>
                <div>support@greenway-logistics.com | (901) 445-0394</div>
            </div>
        </div>
    `;

    const footer = `
        <div class="footer">
            <p>Thank you for choosing Greenway Logistics - Your sustainable shipping partner.</p>
            <p>This document was generated on ${formatDate} and is valid for 30 days.</p>
            <p>© ${new Date().getFullYear()} Greenway Logistics Inc. All rights reserved.</p>
            <div class="eco-badge">
                <span>🌿 This shipment saved ${shipment.co2Saved || 'Unknown'} of CO₂ emissions</span>
            </div>
        </div>
    `;

    const printButton = `
        <div class="no-print" style="text-align: center; margin: 20px 0;">
            <button onclick="window.print()" style="background-color: #0A3622; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold;">
                Print Document
            </button>
        </div>
    `;

    const safeTrackingNumber = shipment.trackingNumber || shipment.tracking_number || 'Unknown';
    const invoiceNumber = shipment.payment?.invoiceNumber || `INV-${safeTrackingNumber.substring(2)}`;
    const formattedStatus = shipment.status === 'delivered' ? 'Delivered' :
        shipment.status === 'in-transit' ? 'In Transit' : 'Processing';
    const co2Saved = shipment.co2Saved || 'Unknown';

    let content = "";

    if (type === 'details') {
        content = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Tracking Details - ${safeTrackingNumber}</title>
                ${styles}
            </head>
            <body>
                <div class="container">
                    ${letterhead}
                    <h1 class="document-title">SHIPMENT TRACKING DETAILS</h1>
                    
                    <div class="section">
                        <div class="section-title">Shipment Information</div>
                        <div class="col-layout">
                            <div class="col">
                                <div class="info-group">
                                    <div class="info-label">Tracking Number:</div>
                                    <div class="info-value"><strong>${safeTrackingNumber}</strong></div>
                                </div>
                                <div class="info-group">
                                    <div class="info-label">Status:</div>
                                    <div class="info-value">${formattedStatus}</div>
                                </div>
                                <div class="info-group">
                                    <div class="info-label">Service Type:</div>
                                    <div class="info-value">${shipment.service || 'Standard'}</div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="info-group">
                                    <div class="info-label">Weight:</div>
                                    <div class="info-value">${shipment.weight || 'N/A'}</div>
                                </div>
                                ${shipment.dimensions ? `
                                <div class="info-group">
                                    <div class="info-label">Dimensions:</div>
                                    <div class="info-value">${shipment.dimensions}</div>
                                </div>` : ''}
                                <div class="info-group">
                                    <div class="info-label">CO₂ Emissions Saved:</div>
                                    <div class="info-value" style="color: #155D36; font-weight: bold;">${co2Saved}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="section">
                        <div class="section-title">Delivery Information</div>
                        <div class="col-layout">
                            <div class="col">
                                <div class="info-group">
                                    <div class="info-label">Origin:</div>
                                    <div class="info-value">${shipment.origin || 'N/A'}</div>
                                </div>
                                <div class="info-group">
                                    <div class="info-label">Destination:</div>
                                    <div class="info-value">${shipment.destination || 'N/A'}</div>
                                </div>
                                ${shipment.currentLocation ? `
                                <div class="info-group">
                                    <div class="info-label">Current Location:</div>
                                    <div class="info-value">${shipment.currentLocation}</div>
                                </div>` : ''}
                            </div>
                            <div class="col">
                                ${shipment.status === 'delivered' ? `
                                <div class="info-group">
                                    <div class="info-label">Delivered On:</div>
                                    <div class="info-value">${shipment.deliveredDate || 'N/A'}</div>
                                </div>
                                <div class="info-group">
                                    <div class="info-label">Signed By:</div>
                                    <div class="info-value">${shipment.signedBy || 'N/A'}</div>
                                </div>` : `
                                <div class="info-group">
                                    <div class="info-label">Estimated Delivery:</div>
                                    <div class="info-value">${shipment.estimatedDelivery || 'Pending'}</div>
                                </div>`}
                            </div>
                        </div>
                    </div>
                    
                    ${(shipment.sender || shipment.receiver) ? `
                    <div class="section">
                        <div class="section-title">Sender & Receiver Details</div>
                        <div class="col-layout">
                            ${shipment.sender ? `
                            <div class="col">
                                <div class="info-group">
                                    <div class="info-label">Sender:</div>
                                    <div class="info-value">
                                        ${shipment.sender.name || ''}<br>
                                        ${shipment.sender.address ? shipment.sender.address.replace(/\n/g, '<br>') : ''}<br>
                                        ${shipment.sender.phone || ''}<br>
                                        ${shipment.sender.email || ''}
                                    </div>
                                </div>
                            </div>` : ''}
                            
                            ${shipment.receiver ? `
                            <div class="col">
                                <div class="info-group">
                                    <div class="info-label">Receiver:</div>
                                    <div class="info-value">
                                        ${shipment.receiver.name || ''}<br>
                                        ${shipment.receiver.address ? shipment.receiver.address.replace(/\n/g, '<br>') : ''}<br>
                                        ${shipment.receiver.phone || ''}<br>
                                        ${shipment.receiver.email || ''}
                                    </div>
                                </div>
                            </div>` : ''}
                        </div>
                    </div>` : ''}

                    <div class="section">
                        <div class="section-title">Tracking History</div>
                        ${shipment.history && shipment.history.length > 0 ? `
                        <table>
                            <tr>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Location</th>
                                <th>Description</th>
                            </tr>
                            ${shipment.history.map((event: any) => `
                            <tr>
                                <td>${event.date || 'N/A'}</td>
                                <td>${event.status || 'N/A'}</td>
                                <td>${event.location || 'N/A'}</td>
                                <td>${event.description || 'N/A'}</td>
                            </tr>`).join('')}
                        </table>
                        ` : `
                        <p>No tracking history available.</p>
                        `}
                    </div>
                    
                    ${footer}
                    ${printButton}
                </div>
            </body>
            </html>
        `;
    } else if (type === 'invoice') {
        const payment = shipment.payment || {};
        const total = calculateTotalAmount(payment);
        const currency = payment.currency || 'USD';
        const formatInvoiceAmount = (amount: number | string | undefined) => formatCurrency(amount, currency);

        content = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Invoice - ${invoiceNumber}</title>
                ${styles}
            </head>
            <body>
                <div class="container">
                    ${letterhead}
                    <h1 class="document-title">INVOICE</h1>
                    
                    <div class="col-layout" style="margin-bottom: 20px;">
                        <div class="col">
                            <div class="info-group">
                                <div class="info-label">Bill To:</div>
                                <div class="info-value">
                                    ${shipment.receiver?.name || 'Customer'}<br>
                                    ${shipment.receiver?.address ? shipment.receiver.address.replace(/\n/g, '<br>') : 'N/A'}
                                </div>
                            </div>
                        </div>
                        <div class="col" style="text-align: right;">
                            <div class="info-group">
                                <div class="info-label">Invoice Number:</div>
                                <div class="info-value">${invoiceNumber}</div>
                            </div>
                            <div class="info-group">
                                <div class="info-label">Date:</div>
                                <div class="info-value">${payment.date || formatDate}</div>
                            </div>
                            <div class="info-group">
                                <div class="info-label">Tracking Number:</div>
                                <div class="info-value">${safeTrackingNumber}</div>
                            </div>
                            <div class="info-group">
                                <div class="info-label">Status:</div>
                                <div class="info-value" style="${payment.status === 'paid' ? 'color: #155D36;' : 'color: #cc8400;'} font-weight: bold;">
                                    ${payment.status === 'paid' ? 'PAID' : 'PENDING'}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="section">
                        <div class="section-title">Service Details</div>
                        <div class="info-group">
                            <table>
                                <tr>
                                    <th>Service</th>
                                    <th>Route</th>
                                    <th>Weight</th>
                                    ${shipment.dimensions ? '<th>Dimensions</th>' : ''}
                                </tr>
                                <tr>
                                    <td>${shipment.service || 'Standard Shipping'}</td>
                                    <td>${shipment.origin || 'N/A'} to ${shipment.destination || 'N/A'}</td>
                                    <td>${shipment.weight || 'N/A'}</td>
                                    ${shipment.dimensions ? `<td>${shipment.dimensions}</td>` : ''}
                                </tr>
                            </table>
                        </div>
                    </div>
                    
                    <div class="section">
                        <div class="section-title">Payment Details</div>
                        <table>
                            <tr>
                                <th>Description</th>
                                <th>Amount</th>
                            </tr>
                            <tr>
                                <td>Shipping Cost</td>
                                <td>${formatInvoiceAmount(payment.shipping || 0)}</td>
                            </tr>
                            <tr>
                                <td>Insurance</td>
                                <td>${formatInvoiceAmount(payment.insurance || 0)}</td>
                            </tr>
                            ${payment.customsDuties !== undefined ? `
                            <tr>
                                <td>Customs Duties</td>
                                <td>${formatInvoiceAmount(payment.customsDuties)}</td>
                            </tr>` : ''}
                            ${payment.taxes !== undefined ? `
                            <tr>
                                <td>Taxes</td>
                                <td>${formatInvoiceAmount(payment.taxes)}</td>
                            </tr>` : ''}
                            <tr>
                                <td>Additional Fees</td>
                                <td>${formatInvoiceAmount(payment.additionalFees || 0)}</td>
                            </tr>
                        </table>
                        
                        <table class="totals-table">
                            <tr class="total-row">
                                <td><strong>Total Amount</strong></td>
                                <td><strong>${formatInvoiceAmount(total)}</strong></td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="section">
                        <div class="section-title">Payment Information</div>
                        <div class="col-layout">
                            <div class="col">
                                <div class="info-group">
                                    <div class="info-label">Payment Method:</div>
                                    <div class="info-value">${payment.method || 'N/A'}</div>
                                </div>
                                ${payment.reference ? `
                                <div class="info-group">
                                    <div class="info-label">Reference Number:</div>
                                    <div class="info-value">${payment.reference}</div>
                                </div>` : ''}
                                ${payment.cardType ? `
                                <div class="info-group">
                                    <div class="info-label">Card Type:</div>
                                    <div class="info-value">${payment.cardType}</div>
                                </div>` : ''}
                            </div>
                            <div class="col">
                                ${payment.date ? `
                                <div class="info-group">
                                    <div class="info-label">Payment Date:</div>
                                    <div class="info-value">${payment.date}</div>
                                </div>` : ''}
                                ${payment.dueDate ? `
                                <div class="info-group">
                                    <div class="info-label">Due Date:</div>
                                    <div class="info-value">${payment.dueDate}</div>
                                </div>` : ''}
                                ${payment.accountNumber ? `
                                <div class="info-group">
                                    <div class="info-label">Account Number:</div>
                                    <div class="info-value">xxxx-xxxx-xxxx-${payment.accountNumber.slice(-4)}</div>
                                </div>` : ''}
                            </div>
                        </div>
                        
                        ${payment.status !== 'paid' ? `
                        <div class="info-group" style="margin-top: 15px; padding: 10px; border: 1px solid #f8d7da; background-color: #fff5f5; border-radius: 3px;">
                            <div class="info-label" style="color: #721c24;">Payment Instructions:</div>
                            <div class="info-value" style="color: #721c24;">
                                <p style="margin: 5px 0;">Please make payment by the due date to ensure timely delivery of your shipment.</p>
                                <p style="margin: 5px 0;">Bank Transfer Details:<br>
                                Bank: GreenBank National<br>
                                Account: 1234567890<br>
                                Routing: 987654321<br>
                                Reference: ${invoiceNumber}</p>
                            </div>
                        </div>` : ''}
                    </div>

                    ${shipment.customs ? `
                    <div class="section">
                        <div class="section-title">Customs Information</div>
                        <div class="col-layout">
                            <div class="col">
                                <div class="info-group">
                                    <div class="info-label">Clearance Status:</div>
                                    <div class="info-value">${shipment.customs.status === 'cleared' ? 'Cleared' :
                    shipment.customs.status === 'in-progress' ? 'In Progress' :
                        shipment.customs.status === 'held' ? 'Held' : 'Pending'}</div>
                                </div>
                                ${shipment.customs.entryNumber ? `
                                <div class="info-group">
                                    <div class="info-label">Entry Number:</div>
                                    <div class="info-value">${shipment.customs.entryNumber}</div>
                                </div>` : ''}
                            </div>
                            <div class="col">
                                ${shipment.customs.declaration ? `
                                <div class="info-group">
                                    <div class="info-label">Declaration Number:</div>
                                    <div class="info-value">${shipment.customs.declaration}</div>
                                </div>` : ''}
                                ${shipment.customs.clearedDate ? `
                                <div class="info-group">
                                    <div class="info-label">Cleared Date:</div>
                                    <div class="info-value">${shipment.customs.clearedDate}</div>
                                </div>` : ''}
                            </div>
                        </div>
                    </div>` : ''}
                    
                    <div class="section">
                        <div class="section-title">Terms & Conditions</div>
                        <p style="font-size: 8pt; color: #555;">
                            Payment is due within 30 days of the invoice date. Late payments may incur additional fees. 
                            All services rendered are subject to our standard terms and conditions available at 
                            <span style="color: #155D36;">www.greenway-logistics.com/terms</span>.
                            For any billing inquiries, please contact our customer service at 
                            <span style="color: #155D36;">billing@greenway-logistics.com</span>.
                        </p>
                    </div>
                    
                    ${footer}
                    ${printButton}
                </div>
            </body>
            </html>
        `;
    }

    return content;
}

// Function to download or print the document
function downloadAsPrintableDocument(shipment: any, type: 'details' | 'invoice'): void {
    const shipmentData = JSON.parse(JSON.stringify(shipment));

    if (!shipmentData.trackingNumber && !shipmentData.tracking_number) {
        console.error("Missing tracking number");
        alert("Error generating document: Missing tracking information");
        return;
    }

    try {
        const content = generatePrintableDocument(shipmentData, type);

        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(content);
            printWindow.document.close();

            setTimeout(() => {
                printWindow.focus();
                // Automatically print the document after loading
                setTimeout(() => {
                    try {
                        printWindow.print();
                    } catch (e) {
                        console.error("Print failed:", e);
                    }
                }, 500);
            }, 1000);
        } else {
            alert("Please allow pop-ups to view and print your document.");
        }
    } catch (error) {
        console.error("Error generating document:", error);
        alert("An error occurred while generating the document. Please try again.");
    }
}

export function TrackingResults({ shipment, onBackClick }: { shipment: any, onBackClick?: () => void }) {
    const [mapCoordinates, setMapCoordinates] = useState<{
        center: [number, number];
        current: [number, number];
        origin: [number, number] | null;
        destination: [number, number] | null;
        route: [number, number][];
    }>({
        center: [0, 0],
        current: [0, 0],
        origin: null,
        destination: null,
        route: []
    });
    const [isMapLoading, setIsMapLoading] = useState(true);
    const [showPaymentDetails, setShowPaymentDetails] = useState(false);
    const [isDownloading, setIsDownloading] = useState<string | null>(null);

    const getFormattedStatus = (status: string) => {
        return status.charAt(0).toUpperCase() + status.slice(1).replace(/-/g, ' ');
    };

    useEffect(() => {
        async function loadMapData() {
            setIsMapLoading(true);

            try {
                let currentCoords: [number, number] | null = null;
                if (shipment.currentLocation) {
                    currentCoords = await getCoordinates(shipment.currentLocation);
                }

                const originCoords = await getCoordinates(shipment.origin);
                const destinationCoords = await getCoordinates(shipment.destination);

                const center = currentCoords || originCoords || destinationCoords || [0, 0];

                const routePromises = shipment.history.map((event: any) =>
                    getCoordinates(event.location)
                );

                const routeResults = await Promise.all(routePromises);
                const route = routeResults.filter(Boolean) as [number, number][];

                setMapCoordinates({
                    center,
                    current: currentCoords || center,
                    origin: originCoords,
                    destination: destinationCoords,
                    route
                });
            } catch (error) {
                console.error("Error loading map data:", error);
            } finally {
                setIsMapLoading(false);
            }
        }

        loadMapData();
    }, [shipment]);

    const handleDownload = (type: 'details' | 'invoice') => {
        setIsDownloading(type);
        setTimeout(() => {
            try {
                downloadAsPrintableDocument(shipment, type);
            } catch (err) {
                console.error(`Error generating ${type} document:`, err);
                alert(`Failed to generate ${type} document. Please try again.`);
            } finally {
                setIsDownloading(null);
            }
        }, 500);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `Greenway Tracking - ${shipment.trackingNumber}`,
                text: `Track your Greenway shipment: ${shipment.trackingNumber}`,
                url: window.location.href,
            })
                .catch((error) => console.log('Error sharing', error));
        } else {
            navigator.clipboard.writeText(window.location.href)
                .then(() => alert("Tracking link copied to clipboard!"))
                .catch((error) => console.error("Failed to copy link: ", error));
        }
    };

    const renderSenderReceiverInfo = () => (
        <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Sender & Receiver Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <UserIcon className="h-4 w-4 text-green-dark" />
                        </div>
                        <h4 className="font-medium text-gray-900">Sender</h4>
                    </div>
                    <div className="space-y-2 pl-11">
                        {shipment.sender?.name && (
                            <div>
                                <p className="text-sm text-gray-500">Name</p>
                                <p className="font-medium">{shipment.sender.name}</p>
                            </div>
                        )}
                        {shipment.sender?.address && (
                            <div>
                                <p className="text-sm text-gray-500">Address</p>
                                <p className="font-medium whitespace-pre-line">{shipment.sender.address}</p>
                            </div>
                        )}
                        {shipment.sender?.phone && (
                            <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="font-medium">{shipment.sender.phone}</p>
                            </div>
                        )}
                        {shipment.sender?.email && (
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium text-green-dark">{shipment.sender.email}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <UserIcon className="h-4 w-4 text-green-dark" />
                        </div>
                        <h4 className="font-medium text-gray-900">Receiver</h4>
                    </div>
                    <div className="space-y-2 pl-11">
                        {shipment.receiver?.name && (
                            <div>
                                <p className="text-sm text-gray-500">Name</p>
                                <p className="font-medium">{shipment.receiver.name}</p>
                            </div>
                        )}
                        {shipment.receiver?.address && (
                            <div>
                                <p className="text-sm text-gray-500">Address</p>
                                <p className="font-medium whitespace-pre-line">{shipment.receiver.address}</p>
                            </div>
                        )}
                        {shipment.receiver?.phone && (
                            <div>
                                <p className="text-sm text-gray-500">Phone</p>
                                <p className="font-medium">{shipment.receiver.phone}</p>
                            </div>
                        )}
                        {shipment.receiver?.email && (
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium text-green-dark">{shipment.receiver.email}</p>
                            </div>
                        )}
                        {shipment.receiver?.instructions && (
                            <div>
                                <p className="text-sm text-gray-500">Special Instructions</p>
                                <p className="font-medium text-sm">{shipment.receiver.instructions}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderPaymentInfo = () => (
        <div className="mt-6 pt-6 border-t border-gray-200">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setShowPaymentDetails(!showPaymentDetails)}
            >
                <h3 className="text-lg font-semibold">Payment & Clearance Information</h3>
                <Button variant="ghost" size="sm" className="p-1 h-auto">
                    {showPaymentDetails ? <ChevronUpIcon size={18} /> : <ChevronDownIcon size={18} />}
                </Button>
            </div>

            {showPaymentDetails && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 bg-gray-50 p-4 rounded-lg"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500">Invoice Number</p>
                                    <p className="font-medium">
                                        {shipment.payment?.invoiceNumber ||
                                            (shipment.trackingNumber ?
                                                `INV - ${shipment.trackingNumber.substring(2)}` :
                                                `INV - ${(shipment.tracking_number || '').substring(2) || 'Unknown'}`)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Payment Status</p>
                                    <div className={cn(
                                        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
                                        (shipment.payment?.status === "paid") ? "bg-green-100 text-green-800" :
                                            (shipment.payment?.status === "pending") ? "bg-yellow-100 text-yellow-800" :
                                                "bg-gray-100 text-gray-800"
                                    )}>
                                        {shipment.payment?.status === "paid" ? "Paid" :
                                            shipment.payment?.status === "pending" ? "Pending" :
                                                "Not Available"}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Payment Method</p>
                                    <p className="font-medium">{shipment.payment?.method || "Not Available"}</p>
                                </div>
                                {shipment.payment?.date && (
                                    <div>
                                        <p className="text-sm text-gray-500">Payment Date</p>
                                        <p className="font-medium">{shipment.payment.date}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-sm text-gray-500">Shipping Cost</p>
                                    <p className="font-medium">{formatCurrency(shipment.payment?.shipping, shipment.payment?.currency)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Insurance</p>
                                    <p className="font-medium">{formatCurrency(shipment.payment?.insurance, shipment.payment?.currency)}</p>
                                </div>
                                {(shipment.payment?.customsDuties !== undefined || shipment.payment?.taxes !== undefined) && (
                                    <>
                                        {shipment.payment?.customsDuties !== undefined && (
                                            <div>
                                                <p className="text-sm text-gray-500">Customs Duties</p>
                                                <p className="font-medium">{formatCurrency(shipment.payment.customsDuties, shipment.payment.currency)}</p>
                                            </div>
                                        )}
                                        {shipment.payment?.taxes !== undefined && (
                                            <div>
                                                <p className="text-sm text-gray-500">Taxes</p>
                                                <p className="font-medium">{formatCurrency(shipment.payment.taxes, shipment.payment.currency)}</p>
                                            </div>
                                        )}
                                    </>
                                )}
                                <div>
                                    <p className="text-sm text-gray-500">Additional Fees</p>
                                    <p className="font-medium">{formatCurrency(shipment.payment?.additionalFees, shipment.payment?.currency)}</p>
                                </div>
                                <div className="pt-2 border-t border-gray-200">
                                    <p className="text-sm font-semibold text-gray-700">Total Amount</p>
                                    <p className="font-bold text-green-dark">
                                        {formatCurrency(
                                            calculateTotalAmount(shipment.payment),
                                            shipment.payment?.currency
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {shipment.customs && (
                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <h4 className="font-medium text-gray-900 mb-3">Customs Clearance Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-gray-500">Clearance Status</p>
                                        <ClearanceStatusBadge status={shipment.customs.status} />
                                    </div>
                                    {shipment.customs.entryNumber && (
                                        <div>
                                            <p className="text-sm text-gray-500">Entry Number</p>
                                            <p className="font-medium">{shipment.customs.entryNumber}</p>
                                        </div>
                                    )}
                                    {shipment.customs.declaration && (
                                        <div>
                                            <p className="text-sm text-gray-500">Declaration Number</p>
                                            <p className="font-medium">{shipment.customs.declaration}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-3">
                                    {shipment.customs.clearedDate && (
                                        <div>
                                            <p className="text-sm text-gray-500">Cleared Date</p>
                                            <p className="font-medium">{shipment.customs.clearedDate}</p>
                                        </div>
                                    )}
                                    {shipment.customs.inspectionStatus && (
                                        <div>
                                            <p className="text-sm text-gray-500">Inspection Status</p>
                                            <p className="font-medium">{shipment.customs.inspectionStatus}</p>
                                        </div>
                                    )}
                                    {shipment.customs.notes && (
                                        <div>
                                            <p className="text-sm text-gray-500">Notes</p>
                                            <p className="font-medium text-sm">{shipment.customs.notes}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {shipment.customs.documents && shipment.customs.documents.length > 0 && (
                                <div className="mt-3">
                                    <p className="text-sm text-gray-500 mb-2">Required Documents</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {shipment.customs.documents.map((doc: any, idx: number) => (
                                            <div key={idx} className="flex items-center justify-between bg-white p-2 rounded-md border border-gray-100">
                                                <span className="text-sm">{doc.name}</span>
                                                <span className={cn(
                                                    "text-xs font-medium px-2 py-0.5 rounded-full",
                                                    doc.received ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                                )}>
                                                    {doc.received ? "Received" : "Pending"}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mt-4 flex flex-wrap gap-2">
                        {shipment.payment?.status === "paid" && (
                            <Button
                                variant="outline"
                                onClick={() => handleDownload('invoice')}
                                disabled={!!isDownloading}
                            >
                                <Download className="h-4 w-4 mr-2" />
                                {isDownloading === 'invoice' ? 'Preparing...' : 'Download Invoice'}
                            </Button>
                        )}

                        {shipment.payment?.status === "pending" && (
                            <div className="mt-4 w-full p-3 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
                                <p className="font-medium mb-1">Payment Instructions</p>
                                <p>Please complete payment to ensure timely delivery of your shipment.</p>
                                <Button
                                    className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white"
                                    size="sm"
                                >
                                    Pay Now
                                </Button>
                            </div>
                        )}

                        {shipment.customs && shipment.customs.status === "held" && (
                            <div className="mt-4 w-full p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-800">
                                <p className="font-medium mb-1">Customs Hold Notice</p>
                                <p>Your shipment is currently held by customs. Additional documentation or information may be required.</p>
                                <Button
                                    className="mt-2 bg-red-600 hover:bg-red-700 text-white"
                                    size="sm"
                                >
                                    Contact Customs Broker
                                </Button>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </div>
    );

    const trackingNumber = shipment.trackingNumber || shipment.tracking_number || '';

    return (
        <motion.div
            className="bg-white rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {onBackClick && (
                <div className="pt-6 px-6 mb-2">
                    <Button
                        variant="ghost"
                        className="hover:bg-green-50 text-green-dark flex items-center gap-2 rounded-full transition-all duration-200 font-medium px-4 py-2 border border-green-100 shadow-sm"
                        onClick={onBackClick}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Tracking
                    </Button>
                </div>
            )}

            <div className="bg-green-dark text-white p-6">
                <div className="flex justify-between items-start flex-wrap gap-4">
                    <div>
                        <p className="text-sm text-green-light">Tracking Number</p>
                        <h2 className="text-2xl font-bold">{trackingNumber}</h2>
                    </div>
                    <StatusBadge status={shipment.status} />
                </div>

                <BarcodeDisplay value={trackingNumber} />
            </div>

            <div className="p-6">
                <ShipmentProgressBar status={shipment.status} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Shipment Information</h3>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <p className="font-medium">{getFormattedStatus(shipment.status)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Service Type</p>
                                <p className="font-medium">{shipment.service}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Weight</p>
                                <p className="font-medium">{shipment.weight}</p>
                            </div>
                            {shipment.dimensions && (
                                <div>
                                    <p className="text-sm text-gray-500">Dimensions</p>
                                    <p className="font-medium">{shipment.dimensions}</p>
                                </div>
                            )}
                            <div>
                                <p className="text-sm text-gray-500">CO₂ Emissions Saved</p>
                                <p className="font-medium text-green-dark">{shipment.co2Saved}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Delivery Information</h3>
                        <div className="space-y-3">
                            {shipment.status === "delivered" ? (
                                <>
                                    <div>
                                        <p className="text-sm text-gray-500">Delivered On</p>
                                        <p className="font-medium">{shipment.deliveredDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Received By</p>
                                        <p className="font-medium">{shipment.signedBy || "N/A"}</p>
                                    </div>
                                </>
                            ) : (
                                <div>
                                    <p className="text-sm text-gray-500">Estimated Delivery</p>
                                    <p className="font-medium">{shipment.estimatedDelivery}</p>
                                </div>
                            )}
                            <div>
                                <p className="text-sm text-gray-500">Origin</p>
                                <p className="font-medium">{shipment.origin}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Destination</p>
                                <p className="font-medium">{shipment.destination}</p>
                            </div>
                            {shipment.currentLocation && (
                                <div>
                                    <p className="text-sm text-gray-500">Current Location</p>
                                    <p className="font-medium">{shipment.currentLocation}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {(shipment.sender || shipment.receiver) && renderSenderReceiverInfo()}

                {renderPaymentInfo()}

                <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Shipment Location</h3>
                    <div className="h-[300px] rounded-lg overflow-hidden">
                        {isMapLoading ? (
                            <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                                <div className="animate-pulse flex flex-col items-center">
                                    <svg className="animate-spin h-8 w-8 text-green-dark mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span className="text-gray-500">Loading map data...</span>
                                </div>
                            </div>
                        ) : (
                            <LeafletMap
                                center={mapCoordinates.center}
                                zoom={5}
                                currentLocation={mapCoordinates.current}
                                route={mapCoordinates.route}
                                originLocation={mapCoordinates.origin || undefined}
                                destinationLocation={mapCoordinates.destination || undefined}
                                status={shipment.status}
                            />
                        )}
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Tracking History</h3>
                    <div className="relative">
                        <div className="absolute left-3.5 top-1 h-full w-0.5 bg-gray-200"></div>

                        <ul className="space-y-6">
                            {shipment.history.map((event: any, index: number) => (
                                <li key={index} className="relative pl-10">
                                    <div className={cn(
                                        "absolute left-0 top-1.5 h-7 w-7 rounded-full border-2 flex items-center justify-center",
                                        index === 0 ? "border-green-500 bg-green-50" : "border-gray-300 bg-white"
                                    )}>
                                        <span className={cn(
                                            "h-3 w-3 rounded-full",
                                            index === 0 ? "bg-green-500" : "bg-gray-300"
                                        )}></span>
                                    </div>
                                    <p className="text-sm text-gray-500">{event.date}</p>
                                    <p className="font-medium">{event.status}</p>
                                    <p className="text-gray-600">{event.location}</p>
                                    <p className="text-sm text-gray-500">{event.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex flex-col xs:flex-row justify-end items-center gap-2 xs:gap-4">
                <Button
                    variant="outline"
                    className="border-green-dark text-green-dark w-full xs:w-auto"
                    onClick={() => handleDownload('details')}
                    disabled={!!isDownloading}
                >
                    <Download className="h-4 w-4 mr-2" />
                    {isDownloading === 'details' ? 'Preparing...' : 'Print Details'}
                </Button>
                <Button
                    className="bg-green-dark text-white hover:bg-green-medium w-full xs:w-auto"
                    onClick={handleShare}
                >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Tracking
                </Button>
            </div>
        </motion.div>
    );
}
