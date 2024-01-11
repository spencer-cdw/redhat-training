# -*- coding: utf-8 -*-
# Copyright: (c) 2021, Red Hat Training <training@redhat.com>
# GNU General Public License v3.0+ (see COPYING or https://www.gnu.org/licenses/gpl-3.0.txt)

from __future__ import absolute_import, division, print_function

__metaclass__ = type

DOCUMENTATION = """
  name: qrcode
  author: Red Hat Training <training@redhat.com>
  short_description: Generate a QR code from a string
  description:
    - Uses the C(qrcode) Python package to create a QR code image from a string.
  options:
    _terms:
      description:
        - The path to the PNG image file to create.
    text:
      description:
        - The string to convert to a QR code image.
      type: str
      required: true
    box_size:
      description:
        - The size in pixels of each small squares that compose the QR code.
      type: int
      default: 10
"""

EXAMPLES = """
- name: Ensure the QR code image exists
  set_fact:
    qrcode: "{{ lookup('training.web.qrcode', '/tmp/qrcode.png, text='Hello World') }}"
"""

import qrcode

from ansible.plugins.lookup import LookupBase
from ansible.module_utils._text import to_bytes


class LookupModule(LookupBase):
    def run(self, terms, variables=None, **kwargs):

        self.set_options(var_options=variables, direct=kwargs)
        text = self.get_option("text")
        box_size = self.get_option("box_size")

        for term in terms:
            path = self._loader.path_dwim(term)
            b_path = to_bytes(path, errors="surrogate_or_strict")
            qr = qrcode.QRCode(
                box_size=box_size,
                border=4,
            )
            qr.add_data(text)
            qr.make(fit=True)
            img = qr.make_image(fill_color="black", back_color="white")
            img.save(b_path)

        return []
