export const mockEditorData = `<div style="font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial; line-height:1.5;">
  <h2 style="margin:0 0 12px;">รายการส่งเสริมการขาย – ตัวอย่างตารางสินค้า</h2>

  <!-- ตารางหลัก -->
  <table style="width:100%; border-collapse:collapse; table-layout:fixed; font-size:14px;">
    <thead>
      <tr>
        <th rowspan="2" style="border:1px solid #e5e7eb; padding:8px; background:#f3f4f6; width:16%;">Brand</th>
        <th rowspan="2" style="border:1px solid #e5e7eb; padding:8px; background:#f3f4f6; width:22%;">Commercial name /<br>Material Code</th>
        <th rowspan="2" style="border:1px solid #e5e7eb; padding:8px; background:#f3f4f6; width:26%;">TDM, Model /<br>Material Descriptions</th>
        <th colspan="2" style="border:1px solid #e5e7eb; padding:8px; background:#dbeafe; text-align:center; width:12%;">PERIOD</th>
        <th colspan="2" style="border:1px solid #e5e7eb; padding:8px; background:#fde68a; text-align:center; width:24%;">Trade up</th>
      </tr>
      <tr>
        <th style="border:1px solid #e5e7eb; padding:8px; background:#eef2ff;">START</th>
        <th style="border:1px solid #e5e7eb; padding:8px; background:#eef2ff;">END</th>
        <th style="border:1px solid #e5e7eb; padding:8px; background:#fff7ed;">เครื่องเปล่า</th>
        <th style="border:1px solid #e5e7eb; padding:8px; background:#fff7ed;">เครื่องใช้บริการ</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border:1px solid #e5e7eb; padding:8px;">iPad (A16) Y2025</td>
        <td style="border:1px solid #e5e7eb; padding:8px;">iPad (A16) Y2025</td>
        <td style="border:1px solid #e5e7eb; padding:8px;">
          IPAD11_128GB<br>
          IPAD11_256GB<br>
          IPAD11_512GB<br>
          IPAD11W_128GB<br>
          IPAD11W_256GB<br>
          IPAD11W_512GB
        </td>
        <td style="border:1px solid #e5e7eb; padding:8px; text-align:center;">1</td>
        <td style="border:1px solid #e5e7eb; padding:8px; text-align:center;">68</td>
        <td style="border:1px solid #e5e7eb; padding:8px; text-align:right;">1,000</td>
        <td style="border:1px solid #e5e7eb; padding:8px; text-align:right;">1,000</td>
      </tr>
      <!-- เพิ่มแถวสินค้าได้ตามต้องการ -->
    </tbody>
  </table>

  <!-- เงื่อนไข -->
  <h3 style="margin:16px 0 8px;">เงื่อนไขรายการส่งเสริมการขาย</h3>
  <ol style="padding-left:20px; margin:0;">
    <li>เพียงขายสมาร์ทโฟนพร้อมบิลเสร็จในสต็อกแบรนด์และรุ่นที่กำหนด เพื่อใช้เป็นส่วนลดในการซื้อสมาร์ทโฟนเครื่องใหม่ร่วมกับร้านค้าที่ร่วมรายการ</li>
    <li><strong>(Trade-up+)</strong> เมื่อลูกค้านำเครื่องเก่ารุ่นที่กำหนดเข้าร่วมโปรโมชั่นผ่านใบประเมินราคา ลูกค้าจะได้รับส่วนลดพิเศษเพิ่มจาก <strong>ราคาประเมิน</strong> จำกัด 1 เครื่องต่อรายการ 1 ครั้ง</li>
    <li>สามารถทำรายการ Trade up : <strong>1 บัตรประชาชน ต่อ 1 ใบเสร็จ ต่อ 1 สิทธิ์</strong> Trade up</li>

    <li style="background:#fde68a;">ตัวแทนจำหน่าย จะต้องทำการ activate เครื่องใหม่ที่ทำการขายภายใต้โครงการ Trade in/up
      <u>ภายในวันที่ซื้อเครื่อง</u></li>
    <li style="background:#fde68a;">ตัวแทนจำหน่าย จะต้องนำส่งเครื่องเก่าให้กับ บ.รับซื้อ <u>ภายใน 2 เดือน</u> นับตั้งแต่วันที่ทำรายการ</li>
    <li style="background:#fde68a;">ในกรณีเป็นโปรโมชั่นสำหรับลูกค้าจอง จะต้องทำการใส่ Pre-booking No. ทุกครั้ง</li>

    <li>ต้องยืนยันซื้อเครื่องใหม่กับร้านค้าที่ทำรายการงานขายโทรศัพท์มือถือที่ได้กำหนดไว้ และต้องยืนยันสิทธิ์กับยอดขายเครื่องเท่านั้น ไม่สามารถโอนสิทธิ์ให้ผู้อื่นได้</li>
    <li>การยกเลิกการขาย ต้องย้อนทำรายการในโปรแกรมให้เรียบร้อยก่อน</li>
    <li>ราคาสินค้าจะต้องตรงตามราคามาตรฐานที่บริษัทกำหนด หากผิดเงื่อนไขจะไม่สามารถแลกเครื่องใหม่เป็นเงินสด หรือหวนเป็นเงินสดได้</li>
    <li>บริษัทขอสงวนสิทธิ์ในการเปลี่ยนแปลงเงื่อนไขโดยไม่ต้องแจ้งให้ทราบล่วงหน้า และการตัดสินของบริษัทถือเป็นที่สุด</li>
    <li>ส่วนลดเพิ่มเติมตามรายการ (Trade up) สำหรับลูกค้า AIS เท่านั้น</li>
    <li>บริษัทขอสงวนสิทธิ์ กรณีตรวจพบว่า Trade-up กระทำไม่เป็นไปตามเงื่อนไข</li>
  </ol>
</div>`;
